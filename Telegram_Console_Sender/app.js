const program = require("commander");
const TelegramBot = require("node-telegram-bot-api");
require('dotenv').config();

const bot = new TelegramBot(process.env.TOKEN, { polling: true });

program.version("1.1.1");

program
  .command("send-message")
  .description("Send message to Telegram Bot")
  .alias("sm")
  .argument("<message>")
  .action(function (input) {
    bot.sendMessage(process.env.CHAT_ID, input).then(process.exit);
  });

program
  .command("photo")
  .description(
    "Send photo to Telegram Bot. Just drag and drop it console after p-flag."
  )
  .alias("p")
  .argument("<patch>")
  .action(function (input) {
    bot.sendPhoto(process.env.CHAT_ID, input).then(process.exit);
  });


program.parse(process.argv);