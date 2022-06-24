const TeleBot = require('telebot');
const axios = require('axios');

const BUTTONS = {
    productos: {
        label: 'Ver productos 🛒',
        command: '/productos',
    },
    start: {
        label: 'Iniciar el bot 🤖',
        command: '/world',
    },
    hide: {
        label: 'Ocultar botones⌨️',
        command: '/hide',
    },
    ayuda: {
        label: 'Ayuda 🆘',
        command: '/ayuda',
    },
    payment: {
        label: 'Metodos pago 🤑',
        command: '/pagos',
    },
};

const bot = new TeleBot({
    token: '5546075009:AAExpHiU4VRN48qCWeSIadSa9sdPPlCVps4',
    usePlugins: ['namedButtons'],
    pluginConfig: {
        namedButtons: {
            buttons: BUTTONS,
        },
    },
});

bot.on(['/start'], (msg) => {
    let replyMarkup = bot.keyboard(
        [
            [BUTTONS.productos.label, BUTTONS.payment.label],
            [BUTTONS.ayuda.label, BUTTONS.hide.label],
        ],
        { resize: true }
    );

    return bot.sendMessage(msg.from.id, 'Keyboard example.', { replyMarkup });
});

// Hide keyboard
bot.on('/hide', (msg) => {
    return bot.sendMessage(
        msg.from.id,
        'Has escondido los botones. Escribe /start para que aparezcan nuevamente.',
        { replyMarkup: 'hide' }
    );
});

bot.start();
