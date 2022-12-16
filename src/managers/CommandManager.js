/**
 * @author = { DollnKey }; // https://github.com/DollnKey
 * @description = 'Gerenciador dos Comandos do bot. (SlashCommand)';
 * @version = "v14.7.1";
 */

const fs = require('fs');
const chalk = require("chalk");
const { Collection } = require("discord.js");
const LoggerContainer = require("../containers/LoggerContainer");

module.exports = class CommandManager {
    constructor(client) {
        this.client = client
        this.loaded = new Collection()
        this.logger = new LoggerContainer({
            scope: this.constructor.name
        })
    };

    async load(dirCommands=null) {
        var SlashCommands = [], totalCommands = 0;
        if(!dirCommands) return undefined;
        const Folders = fs.readdirSync(dirCommands);
        for (const Category of Folders) {
            const Commands = await fs.readdirSync(`${dirCommands}/${Category}`).filter(f => f.endsWith('.js'));
            for (const CommandFile of Commands) {
                const Command = new (require(`../.${dirCommands}/${Category}/${CommandFile}`))(this.client);
                if(Command) {
                    try {
                        this.loaded.set(Command.data.name, Command);
                        SlashCommands.push(Command.data); totalCommands++
                    } catch(err) {
                        return this.logger.error(`${err?.message}`, err);
                    };
                };
            };
        };

        await this.registrySlashcommands(SlashCommands, totalCommands);
        return this.logger.info(`Loaded (${chalk.yellowBright.bold(totalCommands)}) commands..`);
    }

    async registrySlashcommands(SlashCommands=[], total=0) {
        if(SlashCommands?.length <= 0) return undefined;

        try {
            this.logger.debug(`Setted (${chalk.yellowBright.bold(total)}) commands in (${chalk.cyanBright.bold(this.client.guilds.cache.size)}) guilds..`);
            setTimeout(async () => {
                await this.client?.application?.commands.set(SlashCommands);
            }, 2000);
        } catch(err) {
            this.logger.error(`${err?.message}`, err);
        };
    };
};