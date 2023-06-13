import { DataSource } from "typeorm";
import { User } from "./models/user";
import { Role } from "./models/role";
import { Log } from "./models/log";
import { ClientServer } from "./models/clientServer";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "test.sqlite3",
    synchronize: false,
    logging: false,
    entities: [User, Role, Log, ClientServer],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
});
