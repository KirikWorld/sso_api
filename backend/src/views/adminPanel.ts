import { User } from "../models/user";
import { Role } from "../models/role";
import { ClientServer } from "../models/clientServer";
import { Log } from "../models/log";
import { authenticate } from "passport";
import { getUser } from "../controllers/userManagment";

const adminpanel = async () => {
    //@ts-ignore
    const { Database, Resource } = await import("@adminjs/typeorm");
    const { default: AdminJsExpress } = await import("@adminjs/express");
    // const { default: buildAuthenticatedRouter } = await import("@adminjs/express");
    const { default: AdminJS, ComponentLoader: ComponentLoader } = await import(
        "adminjs"
    );

    const componentLoader = new ComponentLoader();
    const Components = {
        UserEditor: componentLoader.add("RoleUser", "../components/role-user"),
        RoleEditor: componentLoader.add("UserRole", "../components/user-role"),
    };
    const UserResource = {
        resource: User, // database model
        options: {
            properties: {
                Role: {
                    type: "string",
                    components: {
                        edit: Components.UserEditor, // this is our custom component
                    },
                },
            },
        },
    };

    const RoleResource = {
        resource: Role, // database model
        options: {
            properties: {
                User: {
                    type: "string",
                    components: {
                        edit: Components.RoleEditor, // this is our custom component
                    },
                },
            },
        },
    };

    AdminJS.registerAdapter({ Database, Resource });
    const admin = new AdminJS({
        branding: {
            companyName: "Keycloak",
            logo: "https://blog.desdelinux.net/wp-content/uploads/2019/08/KeyCloak-1.png",
            withMadeWithLove: false,
        },
        resources: [
            // User,
            Role,
            ClientServer,
            Log,
            UserResource,
            // RoleResource
        ],
        componentLoader,
        rootPath: "/admin",
    });
    admin.watch();

    const authenticate = async (email, password) => {
        // Здесь вы можете использовать любую логику для проверки пользователя
        // Например, сравнить с захардкоженными значениями
        if (email && password) {
            let user = await getUser(email, null);
            return user.role[0].title === "superadmin" && { email };
        }
        return null;
    };
    const router = AdminJsExpress.buildAuthenticatedRouter(admin, {
        authenticate,
        cookieName: "administrator",
        cookiePassword: "1saq1wWkd!o29ee)0",
    });
    return { admin, router };
};

export { adminpanel };
