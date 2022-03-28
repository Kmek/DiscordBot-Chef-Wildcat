// Test command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ScrapeCache } = require('../models/scrapecache.js');
const { DmSubs } = require('../models/dmsubs.js');
const { printDB } = require('../util/db-helpers.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('prints the scrapeCache for testing'),
        // .addStringOption(option =>
        //     option.setName('inputtext')
        //         .setDescription('sends a test "menu" to the subscribed channels')
        //         .setRequired(true)),
    async execute(interaction) {
        // Get 15 minutes for the message
        await interaction.deferReply();

        // let text = interaction.options.getString("inputtext");

        // printDB(ScrapeCache);
        // await interaction.followUp("Printing scrapeCache");

        printDB(DmSubs);
        await interaction.followUp("Printing dmSubs");
    }
};