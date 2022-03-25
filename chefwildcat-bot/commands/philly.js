// Philly menu command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getHallUrl, scrapeUrl, createEmbedMessage } = require('../util/db-helpers.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('philly')
        .setDescription('Print the current menu from Philbrook dining hall'),
    async execute(interaction) {
        // Get 15 minutes for the message
        await interaction.deferReply();

        // todo check ScrapeCache, update if scrape was needed

        let url = await getHallUrl("philly");
        let data = await scrapeUrl(url, "Lunch");

        let embed = createEmbedMessage(data, url, "Lunch", "Philbrook");

        await interaction.editReply({ embeds: [embed]});
    }
};