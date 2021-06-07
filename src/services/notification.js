const telegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const bot = new telegramBot(token, { polling: false });

const deliveryMessage = async (message) => {
    try {
        await bot.sendMessage(chatId, message);
    } catch (err) {
        console.error("Message delivery error", err);
    }
}

module.exports = { deliveryMessage }