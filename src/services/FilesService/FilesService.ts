import { PrismaClient, File } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { getPrisma } from "../../clients/prisma";
import { getS3, generatePresignedUrl, getPublicUrl, ensureBucketExists } from "../../clients/s3";
import {TranscriptionJobStatus} from "../../types/enums";

export class FilesService {
    private prisma: PrismaClient;
    private bucketName: string;

    constructor() {
        this.prisma = getPrisma();
        this.bucketName = process.env.S3_BUCKET_NAME || "audio-files";
    }

    async getAllFiles(): Promise<File[]> {
        return this.prisma.file.findMany({ orderBy: { createdAt: "desc" } });
    }

    async getFileById(id: number): Promise<File | null> {
        return this.prisma.file.findUnique({ where: { id } });
    }

    async createUploadUrl(input: { originalName: string; mimetype: string; bytes?: number }) {
        await ensureBucketExists();

        const { url, fields } = await generatePresignedUrl(input.originalName);

        const file = await this.prisma.file.create({
            data: {
                originalName: input.originalName,
                mimetype: input.mimetype,
                bytes: input.bytes ?? null,
                s3Key: fields.key,
                eTag: "",
                url: getPublicUrl(fields.key),
            },
        });

        await this.prisma.transcriptionJob.create({
            data: {
                fileId: file.id,
                status: TranscriptionJobStatus.PROCESSING,
                transcriptionText: null,
            },
        });

        return {
            url,
            file,
        };
    }

    async getFileUrl(id: number): Promise<string | null> {
        const file = await this.getFileById(id);
        if (!file) return null;
        return getPublicUrl(file.s3Key);
    }
}
