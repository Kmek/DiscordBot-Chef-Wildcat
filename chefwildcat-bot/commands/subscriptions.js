// Subscriptions command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getSubscriptionsServer, sendSubscriptionsEmbedMessage, hasServerRole } = require('../models/subs.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('subscriptions')
        .setDescription('prints the list of dining hall subscriptions for the given channel'),
    async execute(interaction) {
        // Get 15 minutes for the message
        await interaction.deferReply();

        if (!hasServerRole(interaction)) return;

        sendSubscriptionsEmbedMessage(interaction);
    }
};