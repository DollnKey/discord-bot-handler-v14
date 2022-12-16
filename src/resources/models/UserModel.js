const BasedSchemaDatabase = require("../../constants/base/BasedModelDatabase");

module.exports = class UserModel extends BasedSchemaDatabase {
    constructor() {
        super({
            name: 'User'
        });
    }

    async run () {
        return {
            id: this.String
        };
    };
};