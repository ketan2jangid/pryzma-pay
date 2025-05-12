import prisma from "@repo/database/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// TODO: ADD ZOD, WINSTON

const SALT_ROUNDS = 10;
async function signup(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;

        console.log(email + "  " + password);

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(user) {
            res.status(400).json({
                success: false,
                message: "User with email already exists"
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                balance: {
                    create: {
                        amount: 0
                    }
                }
            }
        });

        const SECRET = process.env.JWT_SECRET || ""
        const token = jwt.sign({
            id: newUser.id,
            email: newUser.email,
        }, SECRET, {
            expiresIn: '7d'
        });

        res.status(201).json({
            success: true,
            message: "User registed successfully",
            data: {
                token
            }
        });
        return;
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Error while signin",
            error: err
        });
        return;
    }
}

async function signin(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            res.status(400).json({
                success: false,
                message: "Incorrect email-password combination"
            });
            return;
        }

        const SECRET = process.env.JWT_SECRET || ""
        const token = jwt.sign({
            id: user.id,
            email: user.email,
        }, SECRET, {
            expiresIn: '7d'
        });

        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: {
                token
            }
        });
        return;
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Error while signup",
            error: err
        });
        return;
    }
}

export {
    signup,
    signin
};