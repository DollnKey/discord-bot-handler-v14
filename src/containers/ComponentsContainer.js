/**
 * @author = { DollnKey }; // https://github.com/DollnKey
 * @description = 'Personalização dos componentes do Discord.js';
 * @version = "v14.7.1";
 */

const {
    ButtonBuilder, EmbedBuilder, StringSelectMenuBuilder
} = require('discord.js');

class Embed extends EmbedBuilder {
    constructor(data={}) {
        super(data={});
    };
};

class Button extends ButtonBuilder {
    constructor(data={}) {
        super(data={});
    };
};

class Dropdown extends StringSelectMenuBuilder {
    constructor(data={}) {
        super(data={});
    };
};

module.exports = {
    Button, Embed, Dropdown
};