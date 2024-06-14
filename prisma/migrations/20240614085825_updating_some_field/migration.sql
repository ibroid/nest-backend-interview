-- AlterTable
ALTER TABLE `borrowedbook` MODIFY `returned_time` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `penalty` ADD COLUMN `penalty_start` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `Penalty` ADD CONSTRAINT `Penalty_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Members`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
