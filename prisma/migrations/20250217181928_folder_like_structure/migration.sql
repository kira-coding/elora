/*
  Warnings:

  - The `type` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_Subcategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('Root', 'Sub');

-- DropForeignKey
ALTER TABLE "_Subcategories" DROP CONSTRAINT "_Subcategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_Subcategories" DROP CONSTRAINT "_Subcategories_B_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "parentId" TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "Level" NOT NULL DEFAULT 'Sub';

-- DropTable
DROP TABLE "_Subcategories";

-- DropEnum
DROP TYPE "level";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
