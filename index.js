const TeleBot = require('telebot');
const bot = new TeleBot('5546075009:AAExpHiU4VRN48qCWeSIadSa9sdPPlCVps4');

//With this function the bot i'll reply the same we wrote
//bot.on('text', (msg) => msg.reply.text(msg.text));



bot.on('/hello', (msg) => {
    return bot.sendMessage(msg.from.id, `Hey que tal ${ msg.from.first_name }`);
  });

bot.start();