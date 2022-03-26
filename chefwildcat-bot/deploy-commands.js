// Uploads slash commands to the given server

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const fs = require('fs');

const rest = new REST({ version: '9' }).setToken(token);

// Check for clearing flags
if (process.argv.length == 3 && process.argv[2] === "-ct") {
    // Clear guild commands
    rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: ""})
        .then(() => console.log("Cleared test application commands from test guild"))
        .catch(console.error);
} else if (process.argv.length == 3 && process.argv[2] === "-cg") {
    // For global commands (May take an hour to upload to discord)
    rest.put(Routes.applicationCommands(clientId), {body: ""})
        .then(() => console.log("Cleared global application commands"))
        .catch(console.error);
}

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

// Check for flag
if (process.argv.length == 2) { // Default no flags
    // For testing slash commands on one server
    rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
        .then(() => console.log("Uploaded application commands to test guild"))
        .catch(console.error);
} else if (process.argv.length == 3 && process.argv[2] === "-g") {
    // For global commands (May take an hour to upload to discord)
    rest.put(Routes.applicationCommands(clientId), {body: commands})
        .then(() => console.log("Uploaded application commands globally"))
        .catch(console.error);
}