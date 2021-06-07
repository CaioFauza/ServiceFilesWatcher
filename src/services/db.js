const { SELECT_FILE_HASH, INSERT_HASH } = require("../constants/queries");
const { Client } = require('pg');

const client = new Client({
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

const setupDatabase = async () => {
    try {
        await client.connect();
    } catch (err) {
        console.error("Database setup failed.", err);
    }
}

const getFileHash = async (fileName) => {
    try {
        const { rowCount, rows } = await client.query(SELECT_FILE_HASH, [fileName]);
        return rowCount ? { data: rows[0].file_hash, status: true } : { data: "", status: false }
    } catch (err) {
        console.error("File hash retrieve error", err);
    }
}


const insertFileHash = async (fileName, fileHash) => {
    try {
        await client.query(INSERT_HASH, [fileName, fileHash]);
    } catch (err) {
        console.error("File hash insert error", err);
    }
}

module.exports = { setupDatabase, getFileHash, insertFileHash }