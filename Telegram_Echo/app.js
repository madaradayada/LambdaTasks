const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

const bot = new TelegramBot(process.env.TOKEN, { polling: true });

process.env.NTBA_FIX_319 = 1;
process.env.NTBA_FIX_350 = 0;

console.log("bot succesfully started...");

bot.on("message", (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  const toLog =
    text === "/photo"
      ? `Пользователь ${msg.chat.username} запросил картинку`
      : `Пользователь ${msg.chat.username} написал: ${text}`;

  console.log(toLog);

  bot.sendMessage(chatId, `Вы написали: ${text}`);
});

bot.onText(/\/photo/, (msg) => {
  axios({
    method: "get",
    url: "https://picsum.photos/200/300",
    responseType: "stream",
  }).then(function (response) {
    response.data.pipe(fs.createWriteStream("random_photo.jpg"));
  });

  bot.sendPhoto(msg.chat.id, fs.readFileSync("random_photo.jpg"));
});
