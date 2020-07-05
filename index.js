require('dotenv').config()

const telegraf = require(`telegraf`);
const Markup = telegraf;
const bot = new telegraf(process.env.TOKEN);

bot.catch(console.log);

bot.command('start', ctx => {
  sendStartMessage(ctx);
})

function sendStartMessage(ctx) {
  let startMessage = `
Esse bot apenas expulsa as pessoas do chat, nada mais.

Se você gostou dele, que tal me pagar um café? Utilize os botões abaixo.

*❤️ Suporte o desenvolvedor*`;
  
  bot.telegram.sendMessage(ctx.chat.id, startMessage,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🇧🇷 PicPay", url: 'https://picpay.me/jvlianodorneles' },
            { text: "🇺🇸 PayPal", url: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=AUJW6TVC8KVTQ' }
          ]
        ]
      },
      parse_mode: "markdown",
      disable_web_page_preview: true
    })
}

bot.on('new_chat_members', (ctx) => {
    const chatId = ctx.chat.id;
    const userId = ctx.from.id;
    bot.telegram.unbanChatMember(chatId, userId);
});

bot.launch();