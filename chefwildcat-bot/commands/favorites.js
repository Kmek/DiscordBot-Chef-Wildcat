// Favorites command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { DMChannel } = require('discord.js');
const { sendFavoritesEmbedMessage } = require('../models/dmsubs.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('favorites')
        .setDescription('prints the list of favorited menu items'),
    async execute(interaction) {
        // Get 15 minutes for the message
        await interaction.deferReply();

        if (interaction.channel instanceof DMChannel) {
            let channelId = interaction.channel.id;
            sendFavoritesEmbedMessage(interaction, interaction.channel.id);
        } else {
            interaction.editReply({content: "Error: you don't have permission for that here", ephemeral: true });
            return;
        }
    }
};