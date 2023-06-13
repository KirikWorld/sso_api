import * as jwt from "jsonwebtoken";
import { secret } from "..";
import { AppDataSource } from "../database";
import { User } from "../models/user";

interface UserInterface {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    password: string;
    role: any | null;
    UID: string;
}

const UserModel = AppDataSource.getRepository(User);

// Генерация токена по данным пользователя
async function generateToken(user: UserInterface) {
    const payload = {
        uid: user.UID,
        email: user.email,
        role: user.role,
    };
    const token = jwt.sign(payload, secret, {
        expiresIn: "1h",
    });
    return token;
}

// Проверка токена и возврат данных пользователя
async function verifyToken(token: string) {
    let access: boolean = false;
    try {
        const payload = jwt.verify(token, secret) as any;
        const user = await UserModel.findOne({
            where: {
                email: payload.email,
            },
            relations: ["role"],
        });
        if (!user) {
            throw new Error("User not found");
        }
        access = user.role[0].title === "superadmin" && true;
        return access;
    } catch (error) {
        access = false;
        return access;
    }
}

export { generateToken, verifyToken };
