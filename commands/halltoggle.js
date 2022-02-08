// Subscription toggle command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { DMChannel } = require('discord.js');
const { adminRole } = require("../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('halltoggle')
        .setDescription('Toggle the channel subscription to a given dining hall')
        .addStringOption(option =>
            option.setName('hall')
                .setDescription('Dining hall to toggle')
                .setRequired(true)
                .addChoice('Philbrook', 'Philbrook')
                .addChoice('Holloway Commons', 'Holloway Commons')
                .addChoice('Stillings', 'Stillings')
                .addChoice('All', 'All')),
    async execute(interaction) {
        let hall = interaction.options.getString("hall");

        let channelId = interaction.channel.id;
        console.log("Channel: " + channelId);

        if (interaction.channel instanceof DMChannel) {
            console.log("IN A DM");
            // todo
        } else {
            let guildId = interaction.guild.id
            console.log("Guild: " + guildId);

            // Check for role
            if (interaction.member.roles.cache.find(r => r.name === adminRole)) {
                console.log("permission granted");
                // todo
            } else {
                interaction.reply({content: "error wrong role", ephemeral: true });
                return;
            }
        }


        // todo store this somewhere?

        await interaction.reply("Subscribed to " + hall);
    }
};