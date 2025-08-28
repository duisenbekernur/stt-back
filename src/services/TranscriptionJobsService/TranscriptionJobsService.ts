import { PrismaClient, TranscriptionJob } from "@prisma/client";
import { getPrisma } from "../../clients/prisma";
import {TranscriptionJobStatus} from "../../types/enums";

export class TranscriptionJobsService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = getPrisma();
    }

    async getAllJobs(): Promise<TranscriptionJob[]> {
        return this.prisma.transcriptionJob.findMany({ orderBy: { createdAt: "desc" } });
    }

    async getJobById(id: number): Promise<TranscriptionJob | null> {
        return this.prisma.transcriptionJob.findFirst({ where: { id } });
    }

    async createJob(fileId: number): Promise<TranscriptionJob> {
        let job = await this.prisma.transcriptionJob.findFirst({where: {fileId}}) as TranscriptionJob;

        job = await this.prisma.transcriptionJob.update({
                where: { id: job.id },
                data: {
                    status: TranscriptionJobStatus.COMPLETED,
                    transcriptionText: "This is a simulated transcription text for testing purposes.",
                },
                include: {
                    file: true
                }
            });

        return job;
    }
}
