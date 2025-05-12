-- CreateEnum
CREATE TYPE "TxnStatus" AS ENUM ('Processing', 'Success', 'Failed');

-- CreateTable
CREATE TABLE "p2p_transactions" (
    "id" SERIAL NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "status" "TxnStatus" NOT NULL DEFAULT 'Processing',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "p2p_transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "p2p_transactions" ADD CONSTRAINT "p2p_transactions_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p2p_transactions" ADD CONSTRAINT "p2p_transactions_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
