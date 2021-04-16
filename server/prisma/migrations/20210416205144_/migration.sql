/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Exercise` DROP FOREIGN KEY `exercise_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Record` DROP FOREIGN KEY `record_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Routine` DROP FOREIGN KEY `routine_ibfk_1`;

-- DropTable
DROP TABLE `User`;
