const Sequelize = require('sequelize');
const { sequelizeInstance } = require('../util/database.js');
const { DiningHalls } = require('./dininghalls.js');

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
    ScrapeCache: ScrapeCache
};

//  idea: could put db specific functions in these exports

