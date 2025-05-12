import prisma from "@repo/database/client";
import { Request, Response } from "express";
import { generateToken } from "../utils/TokenGenerator";

async function addFund(req: Request, res: Response): Promise<void> {
    try {
        const user = req.user;
        const { amount } = req.body;

        const token = generateToken();

        const txn = await prisma.onRampTransactions.create({
            data: {
                userId: user?.id!,
                amount,
                token
            }
        });
        
        res.json({
            success: true,
            message: "All transactions fetched successfully",
            data: {
                token
            }
        });
        return;
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Error while transfering fund",
            error: err
        });
        return;
    }
}

async function verifyTransfer(req: Request, res: Response): Promise<void> {
    try {
        const { amount, token, userId } = req.body;

        const txn = await prisma.onRampTransactions.findUnique({
            where: {
                userId,
                amount,
                token,
                status: "Processing"
            },
        });

        if(!txn) {
            res.status(404).json({
                success: false,
                message: "Can't find transaction"
            });
            return;
        }

        const updated = await prisma.onRampTransactions.update({
            where: {
                id: txn.id
            },
            data: {
                status: "Success"
            }
        });

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        const balance = await prisma.balance.update({
            where: {
                userEmail: user?.email,
            },
            data: {
                amount: {
                    increment: amount
                }
            }
        })
        
        res.json({
            success: true,
            message: "Transfer verified",
            data: {
                userId,
                amount,
                updatedBalance: balance.amount
            }
        });
        return;
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Error while verifying transfer",
            error: err
        });
        return;
    }
}

export {
    addFund,
    verifyTransfer
}