import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
    id: number;
    email: string;
}

const SECRET = process.env.JWT_SECRET || "";

async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Access Denied. No token provided.' });
            return;
        }
    
        const token = authHeader.split(' ')[1];

        if(!token) {
            res.status(400).json({
                success: false,
                message: "Auth token missing"
            });
            return;
        }

        const decoded = jwt.verify(token, SECRET) as TokenPayload;

        req.user = decoded;
        next();
    } catch (err: any) {
        console.error(err);
        
        if (err.name === 'TokenExpiredError') {
            res.status(401).json({ 
                success: false, 
                message: 'Token expired.' 
            });
            return;
        } else if (err.name === 'JsonWebTokenError') {
            res.status(401).json({ 
                success: false, 
                message: 'Invalid token.' 
            });
            return;
        } else {
            res.status(500).json({ 
                success: false, 
                message: 'Authentication error.' 
            });
            return;
        }
    }
}

export default authMiddleware;