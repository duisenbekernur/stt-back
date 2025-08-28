export interface TranscriptionJob {
    id: string;
    status: 'PROCESSING' | 'COMPLETED' | 'FAILED';
    fileName: string;
    s3Key: string;
    s3Url?: string;
    transcriptionText?: string;
    createdAt: Date;
    completedAt?: Date;
}

export interface CreateJobInput {
    fileName: string;
    s3Key: string;
}

export interface UpdateJobInput {
    status?: 'PROCESSING' | 'COMPLETED' | 'FAILED';
    s3Url?: string;
    transcriptionText?: string;
}