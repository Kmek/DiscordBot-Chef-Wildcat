const Sequelize = require('sequelize');
const { sequelizeInstance } = require('../util/database.js');
const { DiningHalls, diningHallToId } = require('./dininghalls.js');

const ScrapeCache = sequelizeInstance.define('ScrapeCache', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        isDate: true,
    },
    hall: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    breakfast: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    lunch: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    dinner: {
        type: Sequelize.JSON,
        allowNull: true,
    },
});

ScrapeCache.belongsTo(DiningHalls); // DiningHallId

module.exports = {
    ScrapeCache: ScrapeCache,
};

// Check if there is a saved scrape in the db
module.exports.getCachedScrape = async (hallName, mealTime, date) => {
    console.log("\t\tChecking scrapeCache");
    // Check if hallName and date have an entry
    const foundCache = await ScrapeCache.findOne({ where: {
            hall: hallName,
            date: date
        }
    });

    if (foundCache && foundCache[mealTime]) {
        console.log("\t\tUsing cached data");
        return foundCache[mealTime];
    } else {
        return []; // Empty array to show no row found
    }
}

// Save the data to the scrapeCache
module.exports.saveScrapeToCache = async (hallName, mealTime, date, data) => {
    console.log("\t\tSaving cache to scrapeCache");
    // Make object to create/update
    let cache = {
        hall: hallName,
        date: date,
        DiningHallId: await diningHallToId(hallName)
    }
    cache[mealTime.toLowerCase()] = data; 

    // Check if hallName and date already have an entry
    const foundCache = await ScrapeCache.findOne({ where: {
            hall: hallName,
            date: date
        }
    });

    if (!foundCache) {
        // If no row is found, then create it
        await ScrapeCache.create(cache);
    } else {
        // If found a row, update it
        await ScrapeCache.update(cache, {where: {
            id: foundCache.id
        }});
    }
}