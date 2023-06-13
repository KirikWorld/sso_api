import { Response, Request, NextFunction } from "express";
import { createLog, getNowDate } from "./logController";
import { verifyToken } from "./jwtController";

export async function checkSecret(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.body.secret && (await verifyToken(req.body.secret))) {
        next();
    } else {
        createLog(405, `Try to get access with secret`, getNowDate());
        res.status(400).send("Missing or invalid secret field");
    }
}
