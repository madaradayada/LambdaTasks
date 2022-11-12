const TelegramBot = require('node-telegram-bot-api');

const token = '5782683016:AAHcOycb9ktojretC486_ELxzvvka5AgztE';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/curse/, (msg, match) => {
  
    const chatId = msg.chat.id;
  
    bot.sendMessage(chatId, 'test');
  });