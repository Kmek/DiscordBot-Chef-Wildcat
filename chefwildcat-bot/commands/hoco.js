// HoCo menu command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { sendAllMenuEmbedMessages } = require('../util/db-helpers.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hoco')
        .setDescription('Print the current menus from HoCo dining hall'),
    async execute(interaction) {
        // Get 15 minutes for the message
        await interaction.deferReply();

        sendAllMenuEmbedMessages(interaction, "hoco");
    }
};