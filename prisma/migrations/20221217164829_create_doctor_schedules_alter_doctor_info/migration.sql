/*
  Warnings:

  - You are about to drop the column `end_at` on the `doctor_info` table. All the data in the column will be lost.
  - You are about to drop the column `start_at` on the `doctor_info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "doctor_info" DROP COLUMN "end_at",
DROP COLUMN "start_at";

-- CreateTable
CREATE TABLE "doctor_schedules" (
    "id" TEXT NOT NULL,
    "start_at" TEXT NOT NULL,
    "end_at" TEXT NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "doctor_id" TEXT NOT NULL,

    CONSTRAINT "doctor_schedules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "doctor_schedules" ADD CONSTRAINT "doctor_schedules_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
