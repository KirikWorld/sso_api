import { Response, Request, NextFunction } from "express";
import {
    getUser,
    createUser,
    updateUser,
    getAllUsers,
    deleteUser,
} from "../controllers/userManagment";
import { getRole } from "../controllers/roleController";
import { createLog, getNowDate } from "../controllers/logController";

async function getUserApi(req: Request, res: Response, next: NextFunction) {
    let idOrEmail = req.body.idOrEmail;
    if (!idOrEmail) {
        res.sendStatus(401);
        return next();
    }
    typeof idOrEmail === typeof ""
        ? res.send(await getUser(idOrEmail, null))
        : res.send(await getUser(null, idOrEmail));
    await createLog(100, `Try to get user ${idOrEmail}`, getNowDate());
    next();
}

async function getAllUsersApi(req: Request, res: Response, next: NextFunction) {
    res.send(await getAllUsers());
    await createLog(100, `Try to get all users`, getNowDate());
    next();
}

async function deleteUserApi(req: Request, res: Response, next: NextFunction) {
    let idOrEmail = req.body.idOrEmail;
    if (!idOrEmail) {
        res.sendStatus(401);
        return next();
    }
    typeof idOrEmail === typeof ""
        ? res.send(await deleteUser(idOrEmail, null))
        : res.send(await deleteUser(null, idOrEmail));
    await createLog(101, `Try to delete user ${idOrEmail}`, getNowDate());
    next();
}

async function createUserApi(req: Request, res: Response, next: NextFunction) {
    let firstName: string = req.body.firstName;
    let lastName: string = req.body.lastName;
    let email: string = req.body.email;
    let isActive: boolean = req.body.isActive;
    let password: string = req.body.password;
    let role: any | null = req.body.role;
    const rolePromises = role.map((title: string) => getRole(title));
    role = await Promise.all(rolePromises);
    try {
        res.send(
            await createUser(
                firstName,
                lastName,
                email,
                isActive,
                password,
                role
            )
        );
        await createLog(203, `Create user ${email}`, getNowDate());
    } catch {
        res.send({ error: "Can not create user with this params" });
        await createLog(401, `Try to create user ${email}`, getNowDate());
    }
    next();
}

async function updateUserApi(req: Request, res: Response, next: NextFunction) {
    let firstName: string = req.body.firstName;
    let lastName: string = req.body.lastName;
    let email: string = req.body.email;
    let isActive: boolean = req.body.isActive;
    let password: string = req.body.password;
    let role: any | null = req.body.role;
    const rolePromises = role.map((title: string) => getRole(title));
    role = await Promise.all(rolePromises);
    try {
        res.send(
            await updateUser(
                email,
                firstName,
                lastName,
                isActive,
                password,
                role
            )
        );
        await createLog(203, `Update user ${email}`, getNowDate());
    } catch (err) {
        res.send({ error: "Can not update user with this params" });
        await createLog(401, `Try to update user ${email}`, getNowDate());
    }
    next();
}

export {
    getUserApi,
    getAllUsersApi,
    deleteUserApi,
    createUserApi,
    updateUserApi,
};
