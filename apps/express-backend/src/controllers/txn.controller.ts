import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();


async function allTransactions(req: Request, res: Response): Promise<void> {
    try {
        const user = req.user;

        const allTxns = await prisma.p2p_transactions.findMany({
            where: {
                OR: [
                    { senderId: user!.email },
                    { receiverId: user?.email },
                ]
            }
        });

        res.json({
            success: true,
            message: "All transactions fetched successfully",
            data: {
                transactions: allTxns
            }
        });
        return;
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Error while fetching user transactions",
            error: err
        });
        return;
    }
}

async function sentTransactions(req: Request, res: Response): Promise<void> {
    try {
        const user = req.user;

        const sentTxns = await prisma.p2p_transactions.findMany({
            where: {
                senderId: user!.email
            }
        });

        res.json({
            success: true,
            message: "Sent transactions fetched successfully",
            data: {
                transactions: sentTxns
            }
        });
        return;
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Error while fetching user transactions",
            error: err
        });
        return;
    }
}

async function receivedTransactions(req: Request, res: Response): Promise<void> {
    try {
        const user = req.user;

        const receivedTxns = await prisma.p2p_transactions.findMany({
            where: {
                receiverId: user?.email
            }
        });

        res.json({
            success: true,
            message: "Received transactions fetched successfully",
            data: {
                transactions: receivedTxns
            }
        });
        return;
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Error while fetching user transactions",
            error: err
        });
        return;
    }
}

async function transferFunds(req: Request, res: Response): Promise<void> {
    try {
        const user = req.user;
        const { email, amount } = req.body;

        if(!email || !amount) {
            res.status(400).json({
                success: false,
                message: "Email and amount is needed"
            });
            return;
        }

        if(email === user?.email) {
            res.status(400).json({
                success: false,
                message: "Can't send money to self"
            });
            return;
        }

        const receiver = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if(!receiver) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        
        const sender = await prisma.balance.findUnique({
            where: {
                userEmail: user?.email
            }
        });

        if(sender?.amount! < amount) {
            res.status(400).json({
                success: false,
                message: "Insufficient balance"
            });
            return;
        }

        const txn = await prisma.p2p_transactions.create({
            data: {
                senderId: user?.email!,
                receiverId: email,
                amount
            }
        })

        await prisma.$transaction(async(tx) => {
            await tx.balance.update({
                where: {
                    userEmail: user?.email
                },
                data: {
                    amount: {
                        decrement: amount
                    }
                }
            });

            await tx.balance.update({
                where: {
                    userEmail: email
                },
                data: {
                    amount: {
                        increment: amount
                    }
                }
            })
            
            await tx.p2p_transactions.update({
                where: { id: txn.id },
                data: { status: "Success" }
            })
        });

        res.json({
            success: true,
            message: "Funds transfer successful"
        });
        return;
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Error while transfering funds",
            error: err
        });
        return;
    }
}



export {
    allTransactions,
    sentTransactions,
    receivedTransactions,
    transferFunds
}