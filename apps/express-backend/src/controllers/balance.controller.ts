import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

async function checkBalance(req: Request, res: Response): Promise<void> {
    try {
        const user = req.user;

        const balance = await prisma.balance.findUnique({
            where: {
                userEmail: user?.email
            }
        });

        res.json({
            success: true,
            message: "User balance fetched successfully",
            data: {
                user: user?.email,
                balance
            }
        });
        return;
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Error while fetching user balance",
            error: err
        });
        return;
    }
}

export {
    checkBalance
}