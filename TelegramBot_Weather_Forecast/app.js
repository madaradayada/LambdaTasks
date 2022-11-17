const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
require("./api");

const bot = new TelegramBot(process.env.TOKEN, { polling: true });

console.log("bot succesfully started...");

const option = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Forecast in Dnipro', callback_data: 'option'}]
        ]
    })
}

const options = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'With an interval of 3 hours', callback_data: 'optionsmin'}],
            [{text: 'With an interval of 6 hours', callback_data: 'optionsmax'}]
        ]
    })
}

const start = () => {
    bot.on('message', async msg => {
    
        const text = msg.text;
        const chatId = msg.chat.id;
    
       if (text === '/start') {
        return bot.sendMessage(chatId, "select city", option)
       }
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        bot.sendMessage(chatId, 'choose for which period', options);

        switch (data) {
            case 'optionsmin':
              await sendForcastMin();
              break;
            case 'optionsmax':
              await sendFOrcastMin();
              break;
          } 
        
    })
}

start();
