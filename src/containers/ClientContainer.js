/**
 * @author = { DollnKey }; // https://github.com/DollnKey
 * @description = 'Criando e Instanciando o Client';
 * @version = "v14.7.1";
 */

const { Client } = require("discord.js");

const config = require("../../config");
const LoggerContainer = require("./LoggerContainer");
const CommandManager = require("../managers/CommandManager");
const DatabaseManager = require("../managers/DatabaseManager");
const ListenerManager = require("../managers/ListenerManager");

module.exports = class AppClient extends Client {
    constructor(...options) {
        super(...options)

        this.logger = new LoggerContainer({ scope: this.constructor.name })
        this.started = Date.now()
        this.database = new DatabaseManager(this)
        this.loader = {
            command: new CommandManager(this),
            listener: new ListenerManager(this),
        };
    };

    async start() {
        var token = config.token || process.env.TOKEN;
        this.logger.info(`Starting application, system and Functions...`);
        await this.login(token);
        await this.database.load('./src/resources/models');
        await this.loader.command.load('./src/resources/commands');
        await this.loader.listener.load('./src/resources/listeners');
        return;
    };
};