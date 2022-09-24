/*
  Warnings:

  - The primary key for the `TelegramCart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TelegramCart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TelegramCart" DROP CONSTRAINT "TelegramCart_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "TelegramCart_pkey" PRIMARY KEY ("user_id", "product_id");
