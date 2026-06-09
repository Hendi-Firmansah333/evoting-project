/*
  Warnings:

  - You are about to drop the column `name` on the `candidate` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `candidate` table. All the data in the column will be lost.
  - Added the required column `chairman` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `viceChairman` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `candidate` DROP COLUMN `name`,
    DROP COLUMN `photo`,
    ADD COLUMN `chairman` VARCHAR(191) NOT NULL,
    ADD COLUMN `chairmanPhoto` VARCHAR(191) NULL,
    ADD COLUMN `viceChairman` VARCHAR(191) NOT NULL,
    ADD COLUMN `vicePhoto` VARCHAR(191) NULL;
