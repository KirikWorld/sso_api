import { Response, Request, NextFunction } from "express";
import { getUser, createUser, updateUser, getAllUsers } from "../controllers/userManagment";

async function testController(req: Request, res: Response, next: NextFunction) {
    // let user = await updateUser(null, "SurnameChanged", "test@email.com", null, null, null)
    // let user = getUser(null, 1);
    // console.log(await user);
    // let newUser = createUser(
    //     "Name",
    //     "Surname",
    //     "test2@email.com",
    //     false,
    //     "EtoParol123",
    //     null
    // );
    console.log(await getAllUsers())
    res.json({ Hello: "World" });
    next();
}

export { testController };
