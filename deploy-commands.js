// Uploads slash commands to the given server

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const fs = require('fs');

// Read from commands folder
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const f of commandFiles) {
    const command = require("./commands/" + f);
    commands.push(command.data.toJSON());
    console.log("\tadding command " + command.data.name);
}

const rest = new REST({ version: '9' }).setToken(token);

// // For testing slash commands on one server
// rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
//     .then(() => console.log("Registered application commands"))
//     .catch(console.error);

// For global commands (May take an hour to upload to discord)
rest.put(Routes.applicationCommands(clientId), {body: commands})
    .then(() => console.log("Registered application commands"))
    .catch(console.error);