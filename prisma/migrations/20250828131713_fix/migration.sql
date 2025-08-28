/*
  Warnings:

  - The primary key for the `transcription_jobs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `transcription_jobs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."transcription_jobs" DROP CONSTRAINT "transcription_jobs_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "transcription_jobs_pkey" PRIMARY KEY ("id");
