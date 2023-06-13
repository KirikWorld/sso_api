import { Response, Request, NextFunction } from "express";
import { getUser } from "../controllers/userManagment";
import { generateToken } from "../controllers/jwtController";
import * as jwt from "jsonwebtoken";
import { secret } from "..";
import { User } from "../models/user";
import { AppDataSource } from "../database";
import { createLog, getNowDate } from "../controllers/logController";
import { ClientServer } from "../models/clientServer";
import geoip from "geoip-lite";

const UserModel = AppDataSource.getRepository(User);

async function userLogin(req: Request, res: Response, next: NextFunction) {
    let email: string = req.body.email;
    let password: string = req.body.password;
    let source: string = req.body.source;
    const ip: string = req.ip;
    if (!email) {
        createLog(401, `Trying to login but failed`, getNowDate());
        return res.sendStatus(401);
    }
    const ClientRepository = AppDataSource.getRepository(ClientServer);
    if (
        (await ClientRepository.findOne({ where: { title: source } })) === null
    ) {
        createLog(401, `Trying to login with not trusted source`, getNowDate());
        return res.status(401).send({ error: "Source not trusted" });
    }
    let user = await getUser(email, null);
    if (password !== user.password) {
        createLog(401, `User ${user.email} failed login`, getNowDate());
        return res.status(401).send({ error: "Invalid password" });
    } else {
        let cu: string;
        try {
            cu = geoip.lookup(ip).country;
        } catch {
            cu = "RU";
        }
        createLog(200, `User ${user.email} success login`, getNowDate());
        res.send({ token: await generateToken(user), country: cu });
        next();
    }
}

async function userAccess(req: Request, res: Response, next: NextFunction) {
    const token: string = req.body.token;
    const ip: string = req.ip;
    try {
        const payload = jwt.verify(token, secret) as any;
        const user = await UserModel.findOne({
            where: {
                email: payload.email,
            },
            relations: ["role"],
        });
        if (!user) {
            createLog(
                401,
                `User ${user.email} failed to confirm token`,
                getNowDate()
            );
            return res.status(401).send({ error: "Invalid token" });
        }
        createLog(
            200,
            `User ${user.email} success confirm token`,
            getNowDate()
        );
        let cu: string;
        try {
            cu = geoip.lookup(ip).country;
        } catch {
            cu = "RU";
        }
        user["country"] = cu;
        res.send(user);
        next();
    } catch (error) {
        createLog(401, `Failed to confirm token`, getNowDate());
        return res.status(401).send({ error: "Invalid token" });
    }
}

export { userLogin, userAccess };
