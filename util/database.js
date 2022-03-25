const Sequelize = require('sequelize');

module.exports = {
    sequelizeInstance: new Sequelize(
        process.env.PGDATABASE,
        process.env.PGUSER,
        process.env.PGPASSWORD,
        {
            host: process.env.PGHOST,
            dialect: 'postgres',
            logging: false,
            define: {
                freezeTableName: true
            }
        },
    )
};