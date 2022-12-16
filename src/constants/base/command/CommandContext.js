module.exports = class CommandContext {
    constructor(client, interaction, command) {
        this.client = client
        this.interaction = interaction
        this.command = command

        this.user = interaction?.user
        this.guild = interaction?.guild
        this.channel = interaction?.channel
    };
};