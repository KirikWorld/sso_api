import { User } from "../models/user";
import { AppDataSource } from "../database";
import { randomUUID } from "crypto";

const model = AppDataSource.getRepository(User);

async function createUser(
    firstName: string,
    lastName: string,
    email: string,
    isActive: boolean,
    password: string,
    role: any | null
) {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.isActive = isActive;
    user.role = role;
    user.password = password;
    user.UID = randomUUID();
    await model.save(user);
    return user;
}

async function updateUser(
    email: string,
    firstName?: string,
    lastName?: string,
    isActive?: boolean,
    password?: string,
    role?: any
) {
    // Находим пользователя по email
    let user = await getUser(email);
    // Изменяем его свойства, включая связанные данные
    user.firstName = firstName ? firstName : user.firstName;
    user.lastName = lastName ? lastName : user.lastName;
    user.email = email ? email : user.email;
    user.isActive = isActive ? isActive : user.isActive;
    user.password = password ? password : user.password;
    user.role = role ? role : user.role;
    // Сохраняем пользователя с помощью метода save
    await model.save(user);
    // Возвращаем обновленного пользователя
    return user;
}

async function getUser(email?: string, id?: number) {
    let user;
    email
        ? (user = await model.findOne({
              where: { email: email },
              relations: ["role"],
          }))
        : (user = await model.findOne({
              where: { id: id },
              relations: ["role"],
          }));
    return user;
}

async function getAllUsers() {
    return await model.find();
}

async function deleteUser(email?: string, id?: number) {
    let user;
    email
        ? (user = await model.findOne({ where: { email: email } }))
        : (user = await model.findOne({ where: { id: id } }));
    return await model.remove(user);
}

export { getUser, createUser, updateUser, getAllUsers, deleteUser };
