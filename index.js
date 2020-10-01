require('dotenv').config()

const telegraf = require(`telegraf`);
const Markup = telegraf;
const bot = new telegraf(process.env.TOKEN);

bot.catch(console.log);

const invoice = {
  provider_token: process.env.PROVIDER_TOKEN,
  start_parameter: 'doacao',
  title: 'Doação',
  description: '❤️ Suporte o desenvolvimento do @autokick_bot.',
  currency: 'BRL',
  photo_url: 'https://image.freepik.com/free-icon/kick-boot_318-1645.jpg',
//  is_flexible: false,
  prices: [
    { label: 'Doação', amount: 1000 }
  ],
  payload: {
    coupon: 'DICASTELEGRAM'
  }
}

const shippingOptions = [
  {
    id: 'frete_gratis',
    title: 'Frete',
    prices: [{ label: 'Não precisa de frete', amount: 0 }]
  }
]

const replyOptions = Markup.inlineKeyboard([
  Markup.payButton('Doar R$ 10,00'),
//  Markup.urlButton('GitHub', 'https://github.com/jvlianodorneles/autokickbot')
]).extra()

bot.command('start', ctx => {
  sendStartMessage(ctx);
})

function sendStartMessage(ctx) {
  let startMessage = `
🇺🇸 How this bot works: promote it to your group administrator. Anyone who joins the group from that moment on will be automatically kicked out.

🇧🇷 Como este bot funciona: promova-o a administrador do seu grupo. Qualquer pessoa que entrar no grupo a partir desse momento será automaticamente expulso.

*❤️ Suporte o desenvolvedor*`;
  
  bot.telegram.sendMessage(ctx.chat.id, startMessage,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🇧🇷 PicPay", url: 'https://picpay.me/jvlianodorneles' },
            { text: "🇺🇸 PayPal", url: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=AUJW6TVC8KVTQ' },
            { text: "💳 Telegram", callback_data: 'doar' }
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

bot.action('doar', ({ replyWithInvoice }) => replyWithInvoice(invoice, replyOptions))
bot.on('pre_checkout_query', ({ answerPreCheckoutQuery }) => answerPreCheckoutQuery(true))
bot.on('successful_payment', () => console.log('Woohoo'))

bot.launch();
