import { Response, Request, NextFunction } from "express";
import {
    createRole,
    updateRole,
    deleteRole,
    getRoles,
    getRole,
} from "../controllers/roleController";
import { createLog, getNowDate } from "../controllers/logController";

async function createRoleApi(req: Request, res: Response, next: NextFunction) {
    let title: string = req.body.title;
    let description: string = req.body.description;
    try {
        res.send(await createRole(title, description));
        await createLog(203, `Create role ${title}`, getNowDate());
    } catch {
        res.status(401).send({ Error: "Can not create role with this params" });
        await createLog(401, `Try to create role ${title}`, getNowDate());
    }
    next();
}

async function updateRoleApi(req: Request, res: Response, next: NextFunction) {
    let title: string = req.body.title;
    let description: string = req.body.description;
    try {
        res.send(await updateRole(title, description));
        await createLog(203, `Update role ${title}`, getNowDate());
    } catch {
        res.status(401).send({ Error: "Can not create role with this params" });
        await createLog(401, `Try to update role ${title}`, getNowDate());
    }
    next();
}

async function getRoleApi(req: Request, res: Response, next: NextFunction) {
    let title: string = req.body.title;
    if (!title) {
        res.sendStatus(401);
        return next();
    }
    res.send(await getRole(title));
    await createLog(100, `Try to get role ${title}`, getNowDate());
    next();
}

async function getRolesApi(req: Request, res: Response, next: NextFunction) {
    res.send(await getRoles());
    await createLog(100, `Try to get all roles`, getNowDate());
    next();
}

async function deleteRoleApi(req: Request, res: Response, next: NextFunction) {
    let title: string = req.body.title;
    if (!title) {
        res.sendStatus(401);
        return next();
    }
    res.send(deleteRole(title));
    await createLog(101, `Try to delete role ${title}`, getNowDate());
    next();
}

export { createRoleApi, updateRoleApi, getRoleApi, getRolesApi, deleteRoleApi };
