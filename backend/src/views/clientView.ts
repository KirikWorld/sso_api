import { Request, Response, NextFunction } from "express";
import Path from "path";

async function loginPage(req: Request, res: Response, next: NextFunction) {
    res.sendFile(Path.join(__dirname, "../templates/index.html"));
}

export { loginPage };
