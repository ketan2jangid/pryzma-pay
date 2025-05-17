/*
  Warnings:

  - Added the required column `amount` to the `p2p_transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "p2p_transactions" ADD COLUMN     "amount" INTEGER NOT NULL;
