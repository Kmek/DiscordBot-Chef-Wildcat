const { MessageEmbed } = require('discord.js');
const Sequelize = require('sequelize');
const { sequelizeInstance } = require('../util/database.js');
const { adminRole } = require("../config.json");

const Subs = sequelizeInstance.define('Subs', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    guild: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    channel: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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

// Note: How to send a server message
// client.channels.cache.get('937879069532508200').send('HELLO!');

// Note: How to send a direct message
// (await client.channels.fetch('938115394953158656')).recipient.send("HELLLLOO");

// ******************** Check Role ********************//
// Check if on a server the user has the correct admin role
// Note: returns true if user has the server role and false if not
module.exports.hasServerRole = (interaction) => {
    if (interaction.guild && 
        !(interaction.member.roles.cache.find(r => r.name === adminRole))) {
        interaction.followUp({content: "Error: You don't have the role to do that here", ephemeral: true });
        return false;
    }
    return true;
}

// ******************** Subscriptions ********************//

// toggles the given hall for the given channel in a server
// Note: returns new value of the dining hall subscription
module.exports.toggleHallSubscription = async (guild, channel, hallName) => {
    // Check if there's already an entry
    const found = await Subs.findOne({ where: {
            guild: guild,
            channel: channel,
        }
    });

    if (!found) {
        // If no row is found, then create it
        console.log("\tCreating new row");
        let row = { guild: guild, channel: channel }
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
module.exports.getSubscriptionsServer = async (guild, channel) => {
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
    let subs = await module.exports.getSubscriptionsServer(interaction.guild ? interaction.guild.id : null, interaction.channel.id);

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