// Kate Keefe
// DiscordBot-Chef-Wildcat

// Imports
const config = require("./config.json");
const fs = require('fs');
const schedule = require('node-schedule');
const { Client, Intents, Collection } = require('discord.js');
const { sequelizeInstance } = require('./util/database.js');
const { initializeDiningHalls } = require("./models/dininghalls");
const { sendMenusDaily } = require("./models/subs");

// Make client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
    Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS], partials: ["CHANNEL"] });
// Import command files
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const f of commandFiles) {
    const command = require(`./commands/${f}`);
    client.commands.set(command.data.name, command);
    console.log("\tfound command " + command.data.name);
}

// Shows when bot is ready to go
client.on("ready", async () => {
    console.log("\n" + client.user.username);
    client.user.setActivity("UNH Menus", {type: "WATCHING"}); 
    console.log("I am ready!\n");
    exports.logMessage(":cat2: ChefWildcat has started up!");

    // Connect to PostgreSQL
    try {
        // await sequelizeInstance.sync();
        // await sequelizeInstance.sync({ force: true }); // For recreating tables
        await sequelizeInstance.sync({ alter: true }) // For updating models with saving rows as best as possible
        await initializeDiningHalls();
        console.log("Connection to postgres complete!\n");
    } catch (e) {
        console.log(e);
        console.log("ERROR: unable to connect to db!");
        process.exit();
    }

    // Schedule job for 6am every day
    const job = schedule.scheduleJob('0 5 * * *', function() {
        console.log("Sending menus for the day!");
        sendMenusDaily(client)
            .then(console.log("Menus sent for the day!"));
    });

    // Schedule a health check every half an hour
    const healthCheck = schedule.scheduleJob('* */1 * * *', function() {
        // Verify connection to the DB
        sequelizeInstance.authenticate()
            .catch(err => {
                console.error('Unable to connect to the database:', err);
                exports.logErrorMessage(":bangbang: Failed sequelize connection verification healthcheck!");
            });
    });
});

// // Dynamic parsing of DMed commands
// client.on("messageCreate", async msg => {
//     if (!(msg.channel instanceof DMChannel) || msg.author.bot 
//         || !msg.content.startsWith("/")) return;

//     console.log(`DM command "${msg.content}" received!`);
//     const command = client.commands.get(msg.content.slice(1).split(" ")[0]);
//     if (!command) return;

//     // Then run the given command
//     try {
//         await command.dmExecute(msg);
//     } catch (error) {
//         console.error(error);
//         await msg.reply({content: 'An error occurred!', ephemeral: true});
//     }
// })

// Dynamic interactions with slash commands (servers only)
client.on('interactionCreate', async interaction => {
    // Get command from saved commands, if it exists
    if (!interaction.isCommand()) return;
    console.log(`\nInteraction "${interaction.commandName}" created!`);
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    // Then run the given command
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.followUp({content: 'An error occurred! Apologies!', ephemeral: true});
    }
});

// Go!
client.login(config.token);

// ******************** Exports ******************** //
// Send a message in the saved log channel
exports.logMessage = async (text) => {
    client.channels.cache.get(config.logChannelId).send(text);
}

// Send an alert because an error occurred
// Pings the admin role
exports.logErrorMessage = async (text) => {
    client.channels.cache.get(config.logChannelId).send("<@&" 
    + client.channels.cache.get(config.logChannelId).guild.roles.cache.find(r => r.name === config.adminRole).id 
    + "> " + text);
}