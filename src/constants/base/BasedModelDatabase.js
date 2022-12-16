module.exports = class BasedSchemaDatabase {
    constructor(options={ name: "" }) {
        this.name = options?.name

        this.String = { type: String, default: '' }
    }

    async run() {};
};