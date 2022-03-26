const Sequelize = require('sequelize');
const { sequelizeInstance } = require('../util/database.js');

const DiningHalls = sequelizeInstance.define('DiningHalls', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    hall: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
});

// Create dining hall rows once
async function initialize() {
    await DiningHalls.findOrCreate({
        where: { 
            hall: "philly", 
            url: "http://foodpro.unh.edu/shortmenu.asp?sName=%3Cbr+%2F%3E%3Ca+href%3D%22http%3A%2F%2Fwww%2Eunh%2Eedu%2Fdining%22%3E%3Ch2%3EUNH+Dining+%3C%2Fh2%3E%3C%2Fa%3E%3Cp%3E%3Ch2%3EMenus%3C%2Fh2%3E%3C%2Fp%3E&locationNum=30&locationName=Philbrook+Dining+Hall&naFlag=1",
            name: "Philbrook"
        }
    });
    await DiningHalls.findOrCreate({
        where: { 
            hall: "hoco", 
            url: "http://foodpro.unh.edu/shortmenu.asp?sName=%3Cbr+%2F%3E%3Ca+href%3D%22http%3A%2F%2Fwww%2Eunh%2Eedu%2Fdining%22%3E%3Ch2%3EUNH+Dining+%3C%2Fh2%3E%3C%2Fa%3E%3Cp%3E%3Ch2%3EMenus%3C%2Fh2%3E%3C%2Fp%3E&locationNum=80&locationName=Holloway+Commons&naFlag=1",
            name: "Holloway Commons"
        },
    });
    await DiningHalls.findOrCreate({
        where: { 
            hall: "stillings", 
            url: "http://foodpro.unh.edu/shortmenu.asp?sName=%3Cbr+%2F%3E%3Ca+href%3D%22http%3A%2F%2Fwww%2Eunh%2Eedu%2Fdining%22%3E%3Ch2%3EUNH+Dining+%3C%2Fh2%3E%3C%2Fa%3E%3Cp%3E%3Ch2%3EMenus%3C%2Fh2%3E%3C%2Fp%3E&locationNum=10&locationName=Stillings+Dining+Hall&naFlag=1",
            name: "Stillings"
        },
    });
    console.log("DiningHalls initialization complete!");

    // fixme testing
    DiningHalls.findAll()
        .then(x => {
            const { toTable } = require('../util/db-helpers.js');
            toTable(x);
            console.log("DONE PRINTING TABLE")
        }).catch(e => {
            console.log('Oops! something went wrong, : ', e);
        });
}

module.exports = {
    DiningHalls: DiningHalls,
    async initializeDiningHalls() { await initialize() }
};

// Function for finding the id of a hall given the hall name
module.exports.diningHallToId = async (hallName) => {
    let toReturn = null;
    await DiningHalls.findAll({
            where: {
                hall: hallName
            }
        }).then(x => {
            // todo check that element was found first, return default value if not
            toReturn = x[0].id;
        }).catch(e => {
            console.log('Oops! something went wrong, : ', e);
        });
    return toReturn;
} 

// // Function for getting the name of a dining hall given the id
// module.exports.idToDiningHall = async (id) => {
//     // todo
//     // question needed?
// }

// Gets the url of the hall given the name
module.exports.getHallUrl = async (hallName) => {
    let toReturn = null;
    await DiningHalls.findAll({
            where: {
                hall: hallName
            }
        }).then(x => {
            // todo check that element was found first, return default value if not
            // console.log("id: " + x[0].id);
            toReturn = x[0].url;
        }).catch(e => {
            console.log('Oops! something went wrong, : ', e);
        });
    return toReturn;
}