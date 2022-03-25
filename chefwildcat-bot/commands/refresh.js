// Refresh command
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('refresh')
        .setDescription('Print the current menu from UNH dining'),
    async execute(interaction) {
        // await interaction.deferReply();

        // let data = await scrape();
        
        // await interaction.editReply({ embeds: [embed, embed]});
        await interaction.followUp('Pong again!');
    }
};