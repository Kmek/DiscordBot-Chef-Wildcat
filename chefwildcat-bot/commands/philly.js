// Philly menu command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { sendAllMenuEmbedMessages } = require('../util/db-helpers.js');
const { ScrapeCache } = require('../models/scrapecache.js');
const { printDB } = require('../util/db-helpers.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('philly')
        .setDescription('Print the current menus from Philbrook dining hall'),
    async execute(interaction) {
        // Get 15 minutes for the message
        await interaction.deferReply();

        sendAllMenuEmbedMessages(interaction, "philly")
            // .then(x => {
            //     printDB(ScrapeCache); // fixme remove
            // });
    }
};