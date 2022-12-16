const BasedCommand = require("../../../constants/base/command/BasedCommand");
const { Embed } = require('../../../containers/ComponentsContainer');

module.exports = class StatusCommand extends BasedCommand {
    constructor(client) {
        super(client)
        this.client = client

        this.details = { category: 'global' }
        this.data = {
            name: 'status',
            description: "???",
            options: []
        };
    }

    async run(int, ctx) {
        var embed = new Embed()
        .addFields({
            name: `Ping`, inline: true, value: `\`\`\`\n${this.client.ws.ping}ms\n\`\`\``
        },{
            name: `Online`, inline: true, value: `<t:${Math.floor(new Date(this.client.started).getTime() / 1e3)}:R>`
        }).setColor('Random');

        return int.reply({
            embeds: [embed]
        });
    };
};