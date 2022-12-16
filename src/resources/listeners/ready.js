const chalk = require("chalk");
const BasedListener = require("../../constants/base/BasedListener");
const LoggerContainer = require("../../containers/LoggerContainer");

module.exports = class ReadyEvent extends BasedListener {
    constructor(client) {
        super(client)
        this.client = client
        this.name = 'ready'
        this.emit = "on"

        this.logger = new LoggerContainer({
            scope: this.constructor.name
        });
    }

    async run() {
        this.logger.debug(`Loaded (${chalk.cyanBright.bold(this.client.user.username)}) application.`)
    };
};