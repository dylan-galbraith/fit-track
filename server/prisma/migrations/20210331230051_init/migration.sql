-- AlterTable
ALTER TABLE `Exercise` ADD COLUMN     `userId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `Record` ADD COLUMN     `userId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `Routine` ADD COLUMN     `userId` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `Exercise` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Record` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Routine` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
