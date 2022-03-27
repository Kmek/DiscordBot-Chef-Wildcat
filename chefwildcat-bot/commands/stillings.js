// Stillings menu command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { sendAllEmbedMessages, buildAllMenuEmbedMessages } = require('../util/db-helpers.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stillings')
        .setDescription('Print the current menus from Stillings dining hall'),
    async execute(interaction) {
        // Get 15 minutes for the message
        await interaction.deferReply();

        sendAllEmbedMessages(interaction, await buildAllMenuEmbedMessages("stillings"));
    }
};