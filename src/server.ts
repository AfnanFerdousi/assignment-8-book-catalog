import { Server } from "http";
import app from "./app";
import config from "./config/index";
let server: Server;

process.on("uncaughtException", err => {
    console.log("Uncaught Exception ", err);
    process.exit(1);
});

async function main() {
    server = app.listen(config.port, () => {
        console.log(`Application  listening on port ${config.port}`);
    });
    process.on("unhandledRejection", error => {
        if (server) {
            server.close(() => {
                console.log(error);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}

main();
