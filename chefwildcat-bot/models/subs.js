const { MessageEmbed } = require('discord.js');
const Sequelize = require('sequelize');
const { sequelizeInstance } = require('../util/database.js');
const { getHallShortnames } = require('./dininghalls.js');
const { buildAllMenuEmbedMessages } = require('../util/db-helpers.js');
const { getFavorites } = require('./dminfo.js');

const Subs = sequelizeInstance.define('Subs', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    guild: { // Null if row is for a DM
        type: Sequelize.STRING,
        allowNull: true,
    },
    guildname: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    channel: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    channelname: { // Or username if row is DM
        type: Sequelize.STRING,
        allowNull: false,
    },
    hoco: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    philly: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    stillings: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

module.exports = {
    Subs: Subs
};

// Note: How to send a server message (using channelID)
// client.channels.cache.get('937879069532508200').send('HELLO!');

// Note: How to send a direct message (using channelID)
// (await client.channels.fetch('938115394953158656')).recipient.send("HELLLLOO");

// ******************** Subscriptions ********************//

// toggles the given hall for the given channel in a server
// Note: returns new value of the dining hall subscription
module.exports.toggleHallSubscription = async (guild, guildName, channel, channelName, hallName) => {
    // Check if there's already an entry
    const found = await Subs.findOne({ where: {
            guild: guild,
            channel: channel,
        }
    });

    if (!found) {
        // If no row is found, then create it
        console.log("\tCreating new row");
        let row = { 
            guild: guild,
            guildname: guildName,
            channel: channel,
            channelname: channelName
        }
        row[hallName] = true;
        await Subs.create(row);
        return true;
    } else {
        // If found a row, update it
        console.log("\tUpdating existing row");
        found[hallName] = !found[hallName];
        await Subs.update(found.dataValues, {where: {
            id: found.id
        }});
        return found[hallName];
    }
}

// Gets a list of subscriptions for the given channel in a server
module.exports.getSubscriptions = async (guild, channel) => {
    // Check if there's already an entry
    const found = await Subs.findOne({ where: {
            guild: guild,
            channel: channel
        }
    });

    if (!found) {
        // Return no subscriptions
        return { philly: false, hoco: false, stillings: false };
    } else {
        // Return the subscriptions from the db row
        return {
            philly: found.philly,
            hoco: found.hoco,
            stillings: found.stillings
        }
    }
}

// Sends the list of subscriptions in a nicely formatted embed message
module.exports.sendSubscriptionsEmbedMessage = async (interaction) => {
    let subs = await module.exports.getSubscriptions(interaction.guild ? interaction.guild.id : null, /*interaction.guild ? interaction.guild.name : null,*/ interaction.channel.id);

    let embed = new MessageEmbed()
        .setColor('#093e9e')
        .setTitle('Channel Subscriptions for ' + (interaction.guild ? '#' + interaction.channel.name : interaction.user.username))
        .setAuthor({ name: "ChefWildcat", iconURL: 'https://i.imgur.com/0ZodGCo.png' })
        .setDescription("In " + (interaction.guild ? interaction.guild.name : "Direct Message"))
        .setThumbnail("https://i.imgur.com/0ZodGCo.png")
        .setTimestamp()
        .setFooter({ text: 'Subscriptions', iconURL: 'https://i.imgur.com/0ZodGCo.png' });
    embed.addField("Philly", subs.philly ? ":white_check_mark: Subscribed" : ":x: Not Subscribed");
    embed.addField("Holloway Commons", subs.hoco ? ":white_check_mark: Subscribed" : ":x: Not Subscribed");
    embed.addField("Stillings", subs.stillings ? ":white_check_mark: Subscribed" : ":x: Not Subscribed");

    interaction.followUp({ embeds: [embed] });
}

// ******************** Send the Menus Daily ********************//
// Function for sending all of the menus for the day to the subscribed channels
module.exports.sendMenusDaily = async (client) => {
    getHallShortnames()
        .then(halls => {
            sendMenusDailyServers(client, halls);
            sendMenusDailyDms(client, halls);
        });

    const { logMessage } = require('../bot.js');
    logMessage(":incoming_envelope: Daily menu subscriptions sent!");
}

// Sends the server subscriptions
async function sendMenusDailyServers(client, halls) {
    let embeds = {};

    for await (const hall of halls) {
        embeds[hall] = await buildAllMenuEmbedMessages(hall, []);
    }

    Subs.findAll({ where: {
        guild: {
            [Sequelize.Op.not]: null,
        },
    }}).then(subs => subs
            .forEach(row => {
                let channel = client.channels.cache.get(row.channel);
                halls.forEach(hall => {
                    if (row[hall])
                        if (embeds[hall].length > 0)
                            embeds[hall].forEach(embed => channel.send({ embeds: [embed] }));
                        else 
                            channel.send("No menus today for " + hall);
                });
            }));
}

// Sends the channel subscriptions
async function sendMenusDailyDms(client, halls) {
    Subs.findAll({ where: {
        guild: {
            [Sequelize.Op.is]: null,
        },
    }}).then(subs => subs
            .forEach(row => {
                client.channels.fetch(row.channel)
                    .then(channel => {
                        getFavorites(channel.id)
                            .then(favorites => {
                                halls.forEach(hall => {
                                    if (row[hall]) buildAllMenuEmbedMessages(hall, favorites)
                                        .then(embeds => {
                                            if (embeds.length > 0)
                                                embeds.forEach(embed => channel.send({ embeds: [embed] }));
                                            else 
                                                channel.send("No menus today for " + hall);
                                        });
                                });
                            });
                    });
            }));
}