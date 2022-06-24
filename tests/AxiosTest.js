const TeleBot = require('telebot');

let axios = require('axios');

const API = 'https://fakestoreapi.com/products';

const BUTTONS = {
    hide: {
        label: '⌨️ Ocultar',
        command: '/hide',
    },
    listItem: {
        label: '🍍 Articulos',
        command: '/listItem',
    },
    checkStock: {
        label: '🔎 Detalles',
        command: '/checkStock',
    },
    checkTransaction: {
        label: '🛒 Add to Carrito',
        command: '/checkTransaction',
    },
};

const myBot = new TeleBot({
    token: '5546075009:AAExpHiU4VRN48qCWeSIadSa9sdPPlCVps4',
    usePlugins: ['askUser', 'namedButtons'],
    pluginConfig: {
        namedButtons: {
            buttons: BUTTONS,
        },
    },
});

function checkResponse(msg) {
    let text = msg.text;
    let dataResponse = {
        hi:
            'Hola' +
            msg.from.username +
            ',\n Soy tu asistente de Pineapple Store 🍍!\n selecciona una opcion del menú',
        hello:
            'Hola' +
            msg.from.username +
            ',\n Soy tu asistente de Pineapple Store 🍍!\n selecciona una opcion del menú',
    };
    text = text.replace(' ', '_').toLowerCase();
    return dataResponse[text] ? dataResponse[text] : false;
}

myBot.on(['/start', '/back'], (msg) => {
    let replyMarkup = myBot.keyboard(
        [
            [BUTTONS.checkStock.label, BUTTONS.listItem.label],
            ['/start', BUTTONS.hide.label],
        ],
        { resize: true }
    );
    let username = msg.from.username;
    return myBot
        .sendMessage(
            msg.from.id,
            'Hola,' + username + ' \n *Bienvenido a PINEAPPLE STORE* 🍍 \n ',
            { replyMarkup }
        )
        .then((res) => {
            myBot.sendMessage(
                msg.from.id,
                'puedes ver nuestra lista de productos presionando "🍍Articulos"'
            );
        });
});

myBot.on(['/hide'], (msg) => {
    return myBot.sendMessage(
        msg.from.id,
        'escribe HELLO para mostrar el menu',
        { replyMarkup: 'hide' }
    );
});

fetchedData = async function getProductData() {
    try {
        const response = await axios.get(API);
        let articulo = response.data;
        var resultado = ``;
        let len = articulo.length;
        let i = 0;
        for (; i < len; i++) {
            resultado += `${articulo[i].id})  ${articulo[i].title.substring(0, 30)}\n Precio: 💲${articulo[i].price}\n\n`;
        }
        console.log(resultado)
        return myBot.sendMessage(msg.chat.id, ` ${resultado}`);
    } catch (error) {
        console.log(error);
    }

    return resultado
}

const datos = fetchedData()

console.log(datos)