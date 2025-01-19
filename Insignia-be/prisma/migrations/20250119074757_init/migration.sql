/*
  Warnings:

  - You are about to drop the column `from_account_id` on the `transfer` table. All the data in the column will be lost.
  - You are about to drop the column `to_account_id` on the `transfer` table. All the data in the column will be lost.
  - Added the required column `from_user_id` to the `transfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to_user_id` to the `transfer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transfer" DROP CONSTRAINT "transfer_from_account_id_fkey";

-- DropForeignKey
ALTER TABLE "transfer" DROP CONSTRAINT "transfer_to_account_id_fkey";

-- AlterTable
ALTER TABLE "transfer" DROP COLUMN "from_account_id",
DROP COLUMN "to_account_id",
ADD COLUMN     "from_user_id" INTEGER NOT NULL,
ADD COLUMN     "to_user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "transfer" ADD CONSTRAINT "transfer_from_user_id_fkey" FOREIGN KEY ("from_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer" ADD CONSTRAINT "transfer_to_user_id_fkey" FOREIGN KEY ("to_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
