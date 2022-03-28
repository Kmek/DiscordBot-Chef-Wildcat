const { MessageEmbed } = require('discord.js');
const Sequelize = require('sequelize');
const { sequelizeInstance } = require('../util/database.js');

const DmSubs = sequelizeInstance.define('DmSubs', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    channel: { // discord channel id for the dm
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
    favorites: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    dislikes: {
        type: Sequelize.JSON,
        allowNull: true,
    }
});

module.exports = {
    DmSubs: DmSubs
};

// Get the list of favorites
module.exports.getFavorites = async (channel) => {
    console.log("\t\tGetting favorites");
    const row = await DmSubs.findOne({ where: {
            channel: channel
        }
    });

    if (row && row.favorites) {
        return row.favorites;
    } else {
        return [];
    }
}

// Send the list of favorites in a nicely formatted message
module.exports.sendFavoritesEmbedMessage = async (interaction, channel) => {
    let favorites = await module.exports.getFavorites(channel);
    if (!favorites || favorites.length == 0) {
        interaction.followUp("No favorites found");
        return;
    }
    favorites = "- " + favorites.join("\n- ");

    let embed = new MessageEmbed()
        .setColor('#093e9e')
        .setTitle('Favorited Menu Items: ')
        .setAuthor({ name: "ChefWildcat", iconURL: 'https://i.imgur.com/0ZodGCo.png' })
        .setDescription(favorites) 
        .setThumbnail("https://i.imgur.com/0ZodGCo.png")
        .setTimestamp()
        .setFooter({ text: 'Favorites', iconURL: 'https://i.imgur.com/0ZodGCo.png' });

    interaction.followUp({ embeds: [embed] });
}

// Add a favorite to the list
module.exports.addFavorite = async (channel, menuItem) => {
    // Check if hallName and date already have an entry
    const found = await DmSubs.findOne({ where: {
            channel: channel
        }
    });

    if (!found || !found.favorites) {
        console.log("\tCreating new row");
        // If no row is found, then create it
        await DmSubs.create({
            channel: channel,
            favorites: [menuItem]
        });
        return true;
    } else {
        // If found a row, update it
        if (!found.favorites.includes(menuItem)) {
            found.favorites.push(menuItem);
            await DmSubs.update({
                favorites: found.favorites
            }, {where: {
                id: found.id
            }});
            return true;
        }
    }
    return false;
}

// Remove a favorite from the list
module.exports.removeFavorite = async (channel, menuItem) => {
    // Check if hallName and date already have an entry
    const found = await DmSubs.findOne({ where: {
            channel: channel
        }
    });

    if (!found || !found.favorites) {
        console.log("\tNo row to remove items from");
    } else {
        // If found a row, update it
        if (found.favorites.includes(menuItem)) {
            found.favorites = found.favorites.filter(x => x !== menuItem);
            console.log(found.favorites);
            await DmSubs.update({
                favorites: found.favorites
            }, {where: {
                id: found.id
            }});
            return true;
        }
    }
    return false;
}