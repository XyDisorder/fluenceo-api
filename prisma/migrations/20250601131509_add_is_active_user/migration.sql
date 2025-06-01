/*
  Warnings:

  - You are about to drop the column `isActiveUser` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isActiveUser",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;
