const crypto = require("crypto");
const fs = require('fs');
const { getFileHash, insertFileHash } = require("../services/db");
const { setupDatabase } = require("../services/db");
const { deliveryMessage } = require("../services/notification");

const generateFileHash = (fileContent) => {
    return crypto.createHash('sha256').update(fileContent).digest('hex');
}

const compareFileHash = async (fileName, fileContent) => {
    const fileHash = await getFileHash(fileName);

    if (!fileHash.status) {
        await insertFileHash(fileName, generateFileHash(fileContent))
        return true
    }
    return fileHash.data === generateFileHash(fileContent);
}

const handleNotificationMessage = (file) => {
    console.log(`${file} status: CHANGED.`)
    return `File ${file} changed. Please verify your security logs.`
}

const scan = async (servicePath) => {
    await setupDatabase();
    const files = fs.readdirSync(servicePath);

    for (let file of files) {
        let data = fs.readFileSync(`${servicePath}/${file}`);
        let fileContent = data.toString();

        const fileHash = await compareFileHash(file, fileContent);

        !fileHash ? await deliveryMessage(handleNotificationMessage(file)) : console.log(`${file} status: UNTOUCHED.`)
    }
}

module.exports = { scan }