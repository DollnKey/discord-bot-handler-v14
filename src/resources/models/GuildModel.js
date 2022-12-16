const BasedSchemaDatabase = require("../../constants/base/BasedModelDatabase");

module.exports = class GuildModel extends BasedSchemaDatabase {
    constructor() {
        super({
            name: 'Guild'
        })
    }

    async run () {
        return {
            id: this.String
        };
    };
};