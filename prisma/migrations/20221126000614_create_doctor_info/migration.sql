-- CreateTable
CREATE TABLE "doctor_info" (
    "id" TEXT NOT NULL,
    "start_at" TEXT NOT NULL,
    "end_at" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "doctor_id" TEXT NOT NULL,

    CONSTRAINT "doctor_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "doctor_info_doctor_id_key" ON "doctor_info"("doctor_id");

-- AddForeignKey
ALTER TABLE "doctor_info" ADD CONSTRAINT "doctor_info_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
