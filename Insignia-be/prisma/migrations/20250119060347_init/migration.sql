/*
  Warnings:

  - You are about to drop the `Transfer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_from_account_id_fkey";

-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_to_account_id_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Transfer";

-- CreateTable
CREATE TABLE "transfer" (
    "id" SERIAL NOT NULL,
    "transfer_code" TEXT NOT NULL,
    "from_account_id" INTEGER NOT NULL,
    "to_account_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "transfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transfer" ADD CONSTRAINT "transfer_from_account_id_fkey" FOREIGN KEY ("from_account_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer" ADD CONSTRAINT "transfer_to_account_id_fkey" FOREIGN KEY ("to_account_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
