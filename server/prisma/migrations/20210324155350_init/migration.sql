/*
  Warnings:

  - You are about to drop the column `routineId` on the `Exercise` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Exercise` DROP FOREIGN KEY `exercise_ibfk_1`;

-- AlterTable
ALTER TABLE `Exercise` DROP COLUMN `routineId`;

-- CreateTable
CREATE TABLE `_ExerciseToRoutine` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,
UNIQUE INDEX `_ExerciseToRoutine_AB_unique`(`A`, `B`),
INDEX `_ExerciseToRoutine_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ExerciseToRoutine` ADD FOREIGN KEY (`A`) REFERENCES `Exercise`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ExerciseToRoutine` ADD FOREIGN KEY (`B`) REFERENCES `Routine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
