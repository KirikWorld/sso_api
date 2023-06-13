import { Role, RoleInterface } from "../models/role";
import { AppDataSource } from "../database";

const model = AppDataSource.getRepository(Role);

async function createRole(
    title: string,
    description: string
): Promise<RoleInterface> {
    const role: RoleInterface = new Role();
    role.description = description;
    role.title = title;
    return await model.save(role);
}

async function updateRole(
    title: string,
    description?: string
): Promise<RoleInterface> {
    let role: RoleInterface = await getRole(title);
    await model.update(
        { title: role.title },
        {
            title: title ? title : role.title,
            description: description,
        }
    );
    return await getRole(title);
}

async function getRole(title: string) {
    return await model.findOne({ where: { title: title } });
}

async function getRoles() {
    return await model.find();
}

async function deleteRole(title: string) {
    return await model.remove(await getRole(title));
}

export { createRole, getRole, updateRole, deleteRole, getRoles };
