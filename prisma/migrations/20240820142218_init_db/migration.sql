/*
  Warnings:

  - Added the required column `status` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconURL` to the `Technology` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Technology" ADD COLUMN     "iconURL" TEXT NOT NULL;
