const Sequelize = require('sequelize');
const { sequelizeInstance } = require('../util/database.js');

const DmSubs = sequelizeInstance.define('DmSubs', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    hoco: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    philly: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    stillings: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    favorites: {
        type: Sequelize.JSON,
        allowNull: false,
    },
    dislikes: {
        type: Sequelize.JSON,
        allowNull: false,
    }
});

module.exports = {
    DmSubs: DmSubs
};