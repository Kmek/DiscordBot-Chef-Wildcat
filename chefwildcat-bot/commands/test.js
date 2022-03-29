// Test command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ScrapeCache } = require('../models/scrapecache.js');
const { DmInfo } = require('../models/dminfo.js');
const { printDB } = require('../util/db-helpers.js');
const { Subs } = require('../models/subs.js');

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

        // printDB(DmInfo);
        // await interaction.followUp("Printing DmInfo");

        printDB(Subs);
        await interaction.followUp("Printing Subs");
    }
};