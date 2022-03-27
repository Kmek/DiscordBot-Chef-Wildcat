// Breakfast menu command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { sendAllEmbedMessages, buildAllMealEmbedMessages } = require('../util/db-helpers.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('breakfast')
        .setDescription('Print the current breakfast menus'),
    async execute(interaction) {
        // Get 15 minutes for the message
        await interaction.deferReply();

        sendAllEmbedMessages(interaction, await buildAllMealEmbedMessages("Breakfast"));
    }
};