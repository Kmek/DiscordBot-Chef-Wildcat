// HallToggle command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { toggleHallSubscription } = require('../models/subs');
const { hasServerRole } = require('../util/db-helpers');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('halltoggle')
        .setDescription('Toggle the channel subscription to a given dining hall')
        .addStringOption(option =>
            option.setName('hall')
                .setDescription('Dining hall to toggle')
                .setRequired(true)
                .addChoice('Philbrook', 'philly')
                .addChoice('Holloway Commons', 'hoco')
                .addChoice('Stillings', 'stillings')),
    async execute(interaction) {
        // Get 15 minutes for the message
        await interaction.deferReply();

        if (!hasServerRole(interaction)) return;

        let hallName = interaction.options.getString("hall");

        try {
            // Toggle hall subscription
            if (await toggleHallSubscription(
                interaction.guild ? interaction.guild.id : null, 
                interaction.guild ? interaction.guild.name : null, 
                interaction.channel.id, 
                interaction.guild ? interaction.channel.name : interaction.user.username,
                hallName)) {
                interaction.followUp(":white_check_mark: Subscribed to " + hallName);
            } else {
                interaction.followUp(":x: Unsubscribed to " + hallName);
            }
        } catch (e) {
            interaction.followUp("Error: Unable to toggle subscription");
        }
    }
};