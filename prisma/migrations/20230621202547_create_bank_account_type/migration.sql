/*
  Warnings:

  - You are about to drop the column `initialBalance` on the `bank_accounts` table. All the data in the column will be lost.
  - Added the required column `initial_balance` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `bank_accounts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "bank_account_type" AS ENUM ('INVESTMENT', 'CHECKING', 'CASH');

-- AlterTable
ALTER TABLE "bank_accounts" DROP COLUMN "initialBalance",
ADD COLUMN     "initial_balance" DOUBLE PRECISION NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "bank_account_type" NOT NULL;
