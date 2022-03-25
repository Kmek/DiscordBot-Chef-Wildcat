const Sequelize = require('sequelize');
const { sequelizeInstance } = require('../util/database.js');

const ServerSubs = sequelizeInstance.define('ServerSubs', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    guild: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    channel: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    halls: {
        type: Sequelize.JSON,
        allowNull: true,
    }
    // idea toggle /refresh command in this channel?
});



module.exports = {
    ServerSubs: ServerSubs
};