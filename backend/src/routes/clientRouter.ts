import { Router } from "express";
import { loginPage } from "../views/clientView";

const clientRouter = Router();

clientRouter.get("/", loginPage);

export { clientRouter };
