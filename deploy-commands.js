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
    if (process.argv.length == 2) // Check for no flag
        command.data.setDescription(command.data.description + " -dev");
    commands.push(command.data.toJSON());
    console.log("\tadding command " + command.data.name);
}

const rest = new REST({ version: '9' }).setToken(token);

// Check for flag
if (process.argv.length == 2) {
    // For testing slash commands on one server
    rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
        .then(() => console.log("Registered application commands to test guild"))
        .catch(console.error);
} else if (process.argv[2] === "-g") {
    // For global commands (May take an hour to upload to discord)
    rest.put(Routes.applicationCommands(clientId), {body: commands})
        .then(() => console.log("Registered application commands globally"))
        .catch(console.error);
}