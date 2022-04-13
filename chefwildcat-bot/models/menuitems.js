const Sequelize = require('sequelize');
const { sequelizeInstance } = require('../util/database.js');

const MenuItems = sequelizeInstance.define("MenuItems", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    item: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

// Always sort this table by ascending order by items
MenuItems.addScope('defaultScope', {
    order: [['item', 'ASC']],
}, { override: true });

module.exports = {
    MenuItems: MenuItems
};

// ******************** Checking Item ********************//
// Returns true if item is a known menu item, false if not known
module.exports.checkMenuItem = async (itemToCheck) => {
    let results = await MenuItems.findOne({ where: {
        item: itemToCheck.toLowerCase()
    }});
    if (results)
        return true;
    return false;
}

// ******************** Adding Item ********************//
// Adds the menu item if it isn't already in the table
module.exports.addMenuItem = async (menuItem) => {
    MenuItems.findOrCreate({ where: {
        item: menuItem.toLowerCase()
    }});
}

// Goes through an array of scraped data
module.exports.addMenuItems = async (data) => {
    data.forEach(item => {
        if (!item.startsWith("--"))
            module.exports.addMenuItem(item);
    });
}