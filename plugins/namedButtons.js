/*
    Named buttons which triggers bot commands.
*/

module.exports = {
    id: 'namedButtons',
    defaultConfig: {
        buttons: {
            hello: {
                label: '👋 Hello',
                command: '/hello',
            },
            world: {
                label: '🌍 World',
                command: '/world',
            },
            hide: {
                label: '⌨️ Hide keyboard',
                command: '/hide',
            },
        },
    },

    plugin(bot, pluginConfig) {
        const buttons = pluginConfig.buttons || {};

        bot.on('text', (msg, props) => {
            const text = msg.text;
            for (let buttonId in buttons) {
                const button = buttons[buttonId];
                if (button.label === text) {
                    return bot.event(button.command, msg, props);
                }
            }
        });
    },
};
