/*
  Warnings:

  - Added the required column `returned_time` to the `BorrowedBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `borrowedbook` ADD COLUMN `returned_time` DATETIME(3) NOT NULL,
    ADD COLUMN `status` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `Penalty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `member_id` INTEGER NOT NULL,
    `penalty_end` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
