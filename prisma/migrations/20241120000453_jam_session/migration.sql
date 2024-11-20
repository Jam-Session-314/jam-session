/*
  Warnings:

  - Added the required column `bio` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instruments` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "genre" TEXT NOT NULL,
ADD COLUMN     "instruments" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
