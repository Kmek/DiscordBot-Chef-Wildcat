const { MessageEmbed } = require('discord.js');
const Sequelize = require('sequelize');
const { sequelizeInstance } = require('../util/database.js');

const DmInfo = sequelizeInstance.define('DmInfo', {
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
    username: {
        type: Sequelize.STRING,
        allowNull: false,
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
    DmInfo: DmInfo
};

// ******************** Favorites ********************//

// Get the list of favorites
module.exports.getFavorites = async (channel) => {
    console.log("\t\tGetting favorites");
    const row = await DmInfo.findOne({ where: {
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
        .setTitle('Favorited Menu Items for ' + interaction.user.username + ':')
        .setAuthor({ name: "ChefWildcat", iconURL: 'https://i.imgur.com/0ZodGCo.png' })
        .setDescription(favorites) 
        .setThumbnail("https://i.imgur.com/0ZodGCo.png")
        .setTimestamp()
        .setFooter({ text: 'Favorites', iconURL: 'https://i.imgur.com/0ZodGCo.png' });

    interaction.followUp({ embeds: [embed] });
}

// Add a favorite to the list
module.exports.addFavorite = async (channel, username, menuItem) => {
    // Check if hallName and date already have an entry
    const found = await DmInfo.findOne({ where: {
            channel: channel
        }
    });

    // Always store lowercase
    menuItem = menuItem.toLowerCase();

    if (!found || !found.favorites) {
        console.log("\tCreating new row");
        // If no row is found, then create it
        await DmInfo.create({
            channel: channel,
            username: username,
            favorites: [menuItem]
        });
        return true;
    } else {
        // If found a row, update it
        if (!found.favorites.includes(menuItem)) {
            found.favorites.push(menuItem);
            await DmInfo.update(found.dataValues, {where: {
                id: found.id
            }});
            return true;
        }
    }
    return false;
}

// This remove a favorite from the list
module.exports.removeFavorite = async (channel, menuItem) => {
    // Check if hallName and date already have an entry
    const found = await DmInfo.findOne({ where: {
            channel: channel
        }
    });

    // To match saved lowercase saved items
    menuItem = menuItem.toLowerCase();

    if (!found || !found.favorites) {
        console.log("\tNo row to remove items from");
    } else {
        // If found a row, update it
        if (found.favorites.includes(menuItem)) {
            found.favorites = found.favorites.filter(x => x !== menuItem);
            await DmInfo.update(found.dataValues, {where: {
                id: found.id
            }});
            return true;
        }
    }
    return false;
}