const crypto = require("crypto");
const fs = require('fs');
const { getFileHash, insertFileHash, getPathStatus, updatePathStatus } = require("../services/db");
const { setupDatabase } = require("../services/db");
const { deliveryMessage } = require("../services/notification");

const generateFileHash = (fileContent) => {
    return crypto.createHash('sha256').update(fileContent).digest('hex');
}

const generateFileInfo = (pathStatus, fileHash, fileContent) => {
    let type = fileHash.status ? "FILE_CHANGE" : "FILE_INSERT";
    if (!pathStatus) {
        return { type, status: true };
    }
    return { type, status: fileHash.data === generateFileHash(fileContent) };
}

const compareFileHash = async (fileName, fileContent, pathStatus) => {
    const fileHash = await getFileHash(fileName);

    if (!fileHash.status && !pathStatus) {
        await insertFileHash(fileName, generateFileHash(fileContent));
    }
    return generateFileInfo(pathStatus, fileHash, fileContent);
}

const handleNotificationMessage = (file, messageType) => {
    switch (messageType) {
        case "FILE_CHANGE":
            console.log(`${file} status: CHANGED.`)
            return `File ${file} changed. Please verify your security logs.`
        case "FILE_INSERT":
            console.log(`${file} status: NEW FILE.`)
            return `File ${file} inserted. Please verify your security logs.`
    }
}

const handlePathStatus = async (servicePath) => {
    const pathSetup = await getPathStatus(servicePath);

    if (!pathSetup) {
        await updatePathStatus(servicePath);
        return false;
    }
    return true;
}

const scan = async (servicePath) => {
    await setupDatabase();
    const pathStatus = await handlePathStatus(servicePath);

    const files = fs.readdirSync(servicePath);
    for (let file of files) {
        let data = fs.readFileSync(`${servicePath}/${file}`);
        let fileContent = data.toString();

        const fileHash = await compareFileHash(file, fileContent, pathStatus);
        !fileHash.status ? await deliveryMessage(handleNotificationMessage(file, fileHash.type)) : console.log(`${file} status: UNTOUCHED.`)
    }
}

module.exports = { scan }