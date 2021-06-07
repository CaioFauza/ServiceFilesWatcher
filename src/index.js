require("dotenv").config({ path: ".env" });
const { scan } = require("./services/watcher");

const servicePath = process.env.SERVICE_PATH;

try {
    scan(servicePath).then(() => {
        console.log("Scan completed");
        process.exit();
    });
} catch (err) {
    console.error("File scan error", err);
}