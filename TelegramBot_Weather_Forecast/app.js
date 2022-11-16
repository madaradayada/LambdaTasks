const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
require("dotenv").config();

const bot = new TelegramBot(process.env.TOKEN, { polling: true });

console.log("bot succesfully started...");

bot.on('message', msg => {
    
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'keyboard', {
        reply_markup: {
            keyboard: [
                ['Forecast in Dnipro'],
                ['open', 'close']
            ]
        }
    })
})