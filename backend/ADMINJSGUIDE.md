1. Do not forget to use

   ```
   class Name extend BaseEntity 
   ```
   from typeorm to work admin.
2. ```

   import { User } from "../models/user";
   import { Role } from "../models/role";
   import { ClientServer } from "../models/clientServer";

   const adminpanel = async () => {
       //@ts-ignore
       const { Database, Resource } = await import("@adminjs/typeorm");
       const { default: AdminJS } = await import("adminjs");
       AdminJS.registerAdapter({ Database, Resource });
       const admin = new AdminJS({
           resources: [User],
           rootPath: "/admin",
       });
       admin.watch();
       const { default: AdminJsExpress } = await import("@adminjs/express");
       const router = AdminJsExpress.buildRouter(admin);
       return { admin, router };
   };

   export { adminpanel };

   ```
3. In express use:

   ```
   const { admin, router } = await adminpanel();
           app.use(admin.options.rootPath, router);
   ```
