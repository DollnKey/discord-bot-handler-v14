const DatabaseManager = require("../../../managers/DatabaseManager");
const LoggerContainer = require("../../../containers/LoggerContainer");

module.exports = class BasedCommand {
    constructor(client) {
        this.client = client

        this.details = {
            category: "", usage: [], examples: []
        }
        this.requirements = {
            devOnly: true, blocked: true,
            permissions: {
                bot: [], user: []
            }
        }

        this.data = {}

        this.database = new DatabaseManager(client)
        this.logger = new LoggerContainer({
            scope: this.constructor.name
        })
    }

    async run(int, ctx) {};
};