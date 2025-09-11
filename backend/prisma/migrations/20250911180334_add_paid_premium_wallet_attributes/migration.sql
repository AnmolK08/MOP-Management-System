/*
  Warnings:

  - You are about to drop the column `pendingAmt` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Customer" DROP COLUMN "pendingAmt",
ADD COLUMN     "premium" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wallet" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."order" ADD COLUMN     "items" TEXT[],
ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "status" SET DEFAULT 'PLACED',
ALTER COLUMN "totalAmt" SET DEFAULT 0;
