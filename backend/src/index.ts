import { AppDataSource } from "./database";
import express from "express";
import compression from "compression";
import cors from "cors";
// import path from "path";

//routers import;
import { apiRouter } from "./routes/apiRouter";
import { adminpanel } from "./views/adminPanel";
import { clientRouter } from "./routes/clientRouter";

AppDataSource.initialize()
    .then(async () => {
        const app = express();

        //midlewares
        app.use(compression()); //optimizer
        app.use(express.json()); //json parser
        app.use(cors()); //cors disable

        //disabling headers
        app.disable("x-powered-by");

        //staticfiles
        app.use(express.static(__dirname + "/public"));

        //trust for proxy server (do not use without proxy server)
        app.set("trust proxy", true);

        //routers usage
        app.use("/api", apiRouter);
        app.use("/", clientRouter);

        const { admin, router } = await adminpanel();
        app.use(admin.options.rootPath, router);

        //get from port=**** number of port and started server on this port
        app.listen(
            Number(process.argv.slice(2)[0].replace("port=", "")),
            "0.0.0.0",
            () => {
                console.log(
                    `App started on http://localhost:${process.argv
                        .slice(2)[0]
                        .replace("port=", "")}/`
                );
            }
        );
    })
    .catch((error) => console.log(error));

export const secret: string = "d1642a91a7594ba2a5d046c9f0da439f";
