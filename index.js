/**
 * @author = { DollnKey }; // https://github.com/DollnKey
 * @description = 'Arquivo principal da Source';
 * @version = "v14.7.1";
 */

const { IntentsBitField } = require("discord.js");
const AppClient = require("./src/containers/ClientContainer");

console.log('');
const bot = new AppClient({
    intents: [
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.GuildEmojisAndStickers,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildWebhooks,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.Guilds,
    ]
});
bot.start()