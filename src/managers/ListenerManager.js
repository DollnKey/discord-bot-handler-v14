/**
 * @author = { DollnKey }; // https://github.com/DollnKey
 * @description = 'Gerenciador dos Eventos do bot';
 * @version = "v14.7.1";
 */

const chalk = require("chalk");
const fs = require('fs');
const { Collection } = require("discord.js");
const LoggerContainer = require("../containers/LoggerContainer");

module.exports = class ListenerManager {
    constructor(client) {
        this.client = client
        this.loaded = new Collection()
        this.logger = new LoggerContainer({
            scope: this.constructor.name
        });
    };

    async load(dirEvents=null) {
        var totalEvents = 0;
        if(!dirEvents) return undefined;
        const Files = fs.readdirSync(dirEvents).filter(f => f.endsWith('.js'));
        for (const EventFile of Files) {
            const Listener = new (require(`../.${dirEvents}/${EventFile}`))(this.client);
            if(Listener) {
                try {
                    this.loaded.set(Listener.name, Listener); totalEvents++
                    this.client[Listener?.emit](Listener?.name, async(...args) =>{
                        await Listener.run(...args);
                    });
                } catch(err) {
                    return this.logger.error(`${err?.message}`, err);
                };
            };
        };

        return this.logger.info(`Loaded (${chalk.yellowBright.bold(totalEvents)}) listeners..`);
    };
};