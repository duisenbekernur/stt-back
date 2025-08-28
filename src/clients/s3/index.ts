import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const createS3Client = () => {
    return new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.AWS_REGION,
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
    });
};

let s3: AWS.S3 | null = null;

export const getS3 = () => {
    if (!s3) {
        s3 = createS3Client();
    }
    return s3;
};

// Генерация presigned URL для загрузки
export const generatePresignedUrl = async (fileName: string): Promise<{
    url: string;
    fields: Record<string, string>;
}> => {
    const s3 = getS3();
    const bucketName = process.env.S3_BUCKET_NAME || 'audio-files';

    const key = `uploads/${uuidv4()}-${fileName}`;

    const params = {
        Bucket: bucketName,
        Key: key,
        Expires: 60 * 60, // 1 час
    };

    try {
        const url = await s3.getSignedUrlPromise('putObject', params);
        return {
            url,
            fields: {
                key,
                bucket: bucketName,
            },
        };
    } catch (error) {
        console.error('Error generating presigned URL:', error);
        throw new Error('Failed to generate upload URL');
    }
};

export const getPublicUrl = (key: string): string => {
    const s3 = getS3();
    const bucketName = process.env.S3_BUCKET_NAME || 'audio-files';

    return s3.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: key,
        Expires: 60 * 60 * 24 * 7, // 7 дней
    });
};

// Создание бакета если не существует
export const ensureBucketExists = async (): Promise<void> => {
    const s3 = getS3();
    const bucketName = process.env.S3_BUCKET_NAME || 'audio-files';

    try {
        await s3.headBucket({ Bucket: bucketName }).promise();
        console.log(`Bucket "${bucketName}" already exists`);
    } catch (error: any) {
        if (error.statusCode === 404) {
            // Бакет не существует, создаем
            try {
                await s3.createBucket({ Bucket: bucketName }).promise();
                console.log(`Bucket "${bucketName}" created successfully`);

                // Делаем бакет публичным
                const policy = {
                    Version: '2012-10-17',
                    Statement: [
                        {
                            Effect: 'Allow',
                            Principal: '*',
                            Action: ['s3:GetObject'],
                            Resource: [`arn:aws:s3:::${bucketName}/*`],
                        },
                    ],
                };

                await s3.putBucketPolicy({
                    Bucket: bucketName,
                    Policy: JSON.stringify(policy),
                }).promise();

                console.log(`Bucket "${bucketName}" set to public`);
            } catch (createError) {
                console.error('Error creating bucket:', createError);
                throw new Error('Failed to create S3 bucket');
            }
        } else {
            console.error('Error checking bucket existence:', error);
            throw new Error('Failed to check S3 bucket');
        }
    }
};