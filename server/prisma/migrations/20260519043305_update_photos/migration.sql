/*
  Warnings:

  - Added the required column `electionTitle` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamName` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `candidate` ADD COLUMN `electionTitle` VARCHAR(191) NOT NULL,
    ADD COLUMN `teamName` VARCHAR(191) NOT NULL;
