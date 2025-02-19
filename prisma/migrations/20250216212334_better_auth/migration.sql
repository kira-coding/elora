-- CreateEnum
CREATE TYPE "level" AS ENUM ('Root', 'Sub');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "type" "level" NOT NULL DEFAULT 'Sub';
