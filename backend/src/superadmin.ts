import { User } from "./models/user";
import { Role, RoleInterface } from "./models/role";
import { AppDataSource } from "./database";
import { randomUUID } from "crypto";

AppDataSource.initialize().then(() => {
    const UserModel = AppDataSource.getRepository(User);
    const RoleModel = AppDataSource.getRepository(Role);

    async function createRole(): Promise<RoleInterface> {
        const role: RoleInterface = new Role();
        role.description = "Role for SSO full access";
        role.title = "superadmin";
        return await RoleModel.save(role);
    }

    async function createUser() {
        const user = new User();
        user.firstName = "admin";
        user.lastName = "admin";
        user.email = "admin@mail.com";
        user.isActive = true;
        user.role = [await createRole()];
        user.password = "admin";
        user.UID = randomUUID();
        await UserModel.save(user);
        return user;
    }

    createUser();
});
