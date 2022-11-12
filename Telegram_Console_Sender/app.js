const program = require('commander');
const TelegramBot = require('node-telegram-bot-api');
const token = '5782683016:AAHcOycb9ktojretC486_ELxzvvka5AgztE';
const bot = new TelegramBot(token, {polling: true});

console.log('Bot has been started ....'); 

program
.version('1.1.1')

// Commands

const sendMassage = program
.command('message')
.description('Send message to Telegram Bot')
.alias('m')
.action(() => 
  console.log("message")  //не могу понять почему не выводит то что я написал
) 

console.log(sendMassage);

program
.command('photo')
.description('Send photo to Telegram Bot. Just drag and drop it console after p-flag.')
.alias('p')
.action()  //need add function


program
.command('help')
.description('display help for command')
.action()  //need add function


//Options

program.parse(process.argv);

// команда для бота в которую нужно подставить 
//  вместо text, то что мы вводим в консоль

// bot.on("message", (msg) => {
//   const text = msg.text;
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, text)
// })

process.exit();