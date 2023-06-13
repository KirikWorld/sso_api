import { Router } from "express";
import { testController } from "../views/test";
import {
    getUserApi,
    getAllUsersApi,
    deleteUserApi,
    createUserApi,
    updateUserApi,
} from "../views/userApi";
import { checkSecret } from "../controllers/checkSecret";
import { getLogs } from "../controllers/logController";
import {
    getRolesApi,
    getRoleApi,
    deleteRoleApi,
    createRoleApi,
    updateRoleApi,
} from "../views/roleApi";
import { userAccess, userLogin } from "../views/adminApi";

const apiRouter = Router();

// apiRouter.get("/test/", testController);
apiRouter.post("/users/", checkSecret, getAllUsersApi);
apiRouter.post("/user/", checkSecret, getUserApi);
apiRouter.post("/user/delete/", checkSecret, deleteUserApi);
apiRouter.post("/user/create/", checkSecret, createUserApi);
apiRouter.post("/user/update/", checkSecret, updateUserApi);

apiRouter.post("/roles/", checkSecret, getRolesApi);
apiRouter.post("/role/", checkSecret, getRoleApi);
apiRouter.post("/role/delete/", checkSecret, deleteRoleApi);
apiRouter.post("/role/create/", checkSecret, createRoleApi);
apiRouter.post("/role/update/", checkSecret, updateRoleApi);

apiRouter.post("/auth/signin/", userLogin);
apiRouter.post("/auth/check/", userAccess);

apiRouter.get("/logs/", checkSecret, async (req, res, next) => {
    res.send(await getLogs());
    next();
});

export { apiRouter };
