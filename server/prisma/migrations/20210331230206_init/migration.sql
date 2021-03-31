-- AlterTable
ALTER TABLE `Exercise` ALTER COLUMN `userId` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Record` ALTER COLUMN `userId` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Routine` ALTER COLUMN `userId` DROP DEFAULT;
