// Favorite command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { DMChannel } = require('discord.js');
const { addFavorite } = require('../models/dminfo.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('favorite')
        .setDescription('favorites the given menu item to be highlighted later')
        .addStringOption(option =>
            option.setName('item')
                .setDescription('menu item to favorite')
                .setRequired(true)),
    async execute(interaction) {
        // Get 15 minutes for the message
        await interaction.deferReply();

        if (interaction.channel instanceof DMChannel) {
            let channelId = interaction.channel.id;
            let item = interaction.options.getString("item");

            if (await addFavorite(channelId, item)) {
                interaction.followUp("Favorited " + item);
            } else {
                interaction.followUp("Unable to favorite " + item);
            }
        } else {
            interaction.editReply({content: "Error: you don't have permission for that here", ephemeral: true });
            return;
        }
    }
};