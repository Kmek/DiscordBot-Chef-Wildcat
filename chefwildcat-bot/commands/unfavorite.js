// Unavorite command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { DMChannel } = require('discord.js');
const { removeFavorite } = require('../models/dminfo.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unfavorite')
        .setDescription('unfavorites the given menu item')
        .addStringOption(option =>
            option.setName('item')
                .setDescription('menu item to unfavorite')
                .setRequired(true)),
    async execute(interaction) {
        // Get 15 minutes for the message
        await interaction.deferReply();

        if (interaction.channel instanceof DMChannel) {
            let channelId = interaction.channel.id;
            let item = interaction.options.getString("item");

            if (await removeFavorite(channelId, item)) {
                interaction.followUp("Unfavorited " + item);
            } else {
                interaction.followUp("Unable to unfavorite " + item);
            }
        } else {
            interaction.editReply({content: "Error: you don't have permission for that here", ephemeral: true });
            return;
        }
    }
};