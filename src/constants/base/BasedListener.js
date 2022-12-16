const DatabaseManager = require("../../managers/DatabaseManager");

module.exports = class BasedListener {
    constructor(client) {
        this.client = client
        this.name = ''
        this.emit = '' || "on"

        this.database = new DatabaseManager(client)
    }

    async run() {};
};