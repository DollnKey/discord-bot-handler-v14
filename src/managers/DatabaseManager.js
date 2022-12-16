/**
 * @author = { DollnKey }; // https://github.com/DollnKey
 * @description = 'Gerenciador do Banco de Dados';
 * @version = "v14.7.1";
 */

const chalk = require('chalk');
const { readdirSync } = require('fs');
const { Collection } = require("discord.js");
const { connect, model, set } = require("mongoose");

const config = require("../../config");
const LoggerContainer = require("../containers/LoggerContainer");
const DataServices = require("../constants/services/DataServices");

module.exports = class DatabaseManager {
    constructor(client) {
        this.client = client
        this.models = new Collection()
        this.logger = new LoggerContainer({ scope: this.constructor.name })
        this.services = new DataServices(client)
    };

    get(type=null) {
        if(!type) return null;

        const Search = this.models.get(type);
        if(!Search) return undefined;
        else return Search;
    };

    async load(dirSchemas=null) {
        var options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }; set('strictQuery', false);
        connect(config.mongodb, options, (err) => {
            if(err) return this.logger.error(`${err.message}`, err);
            else return this.logger.debug(`Database Connected and Ready succesfully..`);
        }); await this.loadModels(dirSchemas);
    };

    async loadModels(dirSchemas=null) {
        if(!dirSchemas) return undefined;
        var countModels = 0;
        const Folder = readdirSync(dirSchemas).filter(f => f.endsWith('.js'));
        for (const File of Folder) {
            const Schema = new (require(`../.${dirSchemas}/${File}`));
            if(Schema) {
                var SchemaData = model(Schema.name, await Schema.run());
                this.models.set(Schema.name, SchemaData); countModels++
            };
        };

        this.logger.info(`Loaded (${chalk.yellowBright.bold(countModels)}) schemas..`);
    };
};