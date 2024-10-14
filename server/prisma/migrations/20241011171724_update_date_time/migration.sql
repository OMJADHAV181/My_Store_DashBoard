/*
  Warnings:

  - Made the column `Image` on table `ProductTransaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProductTransaction" ADD COLUMN     "DateOfSale" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "Image" SET NOT NULL;
