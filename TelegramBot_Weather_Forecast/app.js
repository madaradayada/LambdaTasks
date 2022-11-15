const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
require("dotenv").config();

const bot = new TelegramBot(process.env.TOKEN, { polling: true });

console.log("bot succesfully started...");

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Hello")
})

function getCurrentWeather(cityName) {
    url = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

    text = `Weather in ${cityName}: 10` 
}