const BasedListener = require("../../constants/base/BasedListener");
const CommandContext = require("../../constants/base/command/CommandContext");
const LoggerContainer = require("../../containers/LoggerContainer");

module.exports = class InteractionCreateEvent extends BasedListener {
    constructor(client) {
        super(client)
        this.client = client
        this.name = 'interactionCreate'
        this.emit = "on"

        this.logger = new LoggerContainer({
            scope: this.constructor.name
        });
    }

    async run(interaction) {
        var int = interaction

        if(!int.isCommand()) return;
        var command = await this.client.loader.command.loaded.get(int.commandName) ??
        await this.client.loader.command.loaded.find(c => c.data?.name.toLowerCase().includes(int.commandName.toLowerCase()));
        if(!command) return;
        
        var ctx = new CommandContext(this.client, interaction, command),
        DataUser = await this.database.services.getModel('user', int.user.id),
        DataGuild = await this.database.services.getModel('guild', int.guild.id);
        
        try {
            await command.run(int, ctx);
        } catch(err) {
            this.logger.error(`${err?.message}`, err);
        };
    };
};