/*
  Warnings:

  - You are about to drop the column `userId` on the `Record` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `userId` ON `Exercise`;

-- DropIndex
DROP INDEX `userId` ON `Routine`;

-- DropIndex
DROP INDEX `userId` ON `Record`;

-- AlterTable
ALTER TABLE `Exercise` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Record` DROP COLUMN `userId`;
