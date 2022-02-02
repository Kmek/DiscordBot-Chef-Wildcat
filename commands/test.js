// Test command
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('sends a test "menu" to the subscribed channels hngg'),
        // .addStringOption(option =>
        //     option.setName('inputtext')
        //         .setDescription('sends a test "menu" to the subscribed channels')
        //         .setRequired(true)),
    async execute(interaction) {
        let text = interaction.options.getString("inputtext");
        await interaction.reply("text: " + text);
    }
};