-- CreateTable
CREATE TABLE "public"."transcription_jobs" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "s3Url" TEXT,
    "transcriptionText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "transcription_jobs_pkey" PRIMARY KEY ("id")
);
