/*
  Warnings:

  - You are about to drop the column `fileName` on the `transcription_jobs` table. All the data in the column will be lost.
  - You are about to drop the column `s3Key` on the `transcription_jobs` table. All the data in the column will be lost.
  - You are about to drop the column `s3Url` on the `transcription_jobs` table. All the data in the column will be lost.
  - Added the required column `fileId` to the `transcription_jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."transcription_jobs" DROP COLUMN "fileName",
DROP COLUMN "s3Key",
DROP COLUMN "s3Url",
ADD COLUMN     "fileId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."transcription_jobs" ADD CONSTRAINT "transcription_jobs_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "public"."File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
