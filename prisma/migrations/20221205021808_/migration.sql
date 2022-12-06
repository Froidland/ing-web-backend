/*
  Warnings:

  - You are about to drop the column `dateOfExcercise` on the `excercise_items` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfConsumption` on the `food_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `excercise_items` DROP COLUMN `dateOfExcercise`;

-- AlterTable
ALTER TABLE `food_items` DROP COLUMN `dateOfConsumption`;
