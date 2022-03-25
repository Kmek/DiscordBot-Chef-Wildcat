const Sequelize = require('sequelize');
const { sequelizeInstance } = require('../util/database.js');
// const { toTable } = require('../util/db-helpers.js');

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
    // todo add url to the table row
});

// Create dining hall rows once
async function initialize() {
    await DiningHalls.findOrCreate({
        where: { hall: "philly", 
            url: "http://foodpro.unh.edu/shortmenu.asp?sName=%3Cbr+%2F%3E%3Ca+href%3D%22http%3A%2F%2Fwww%2Eunh%2Eedu%2Fdining%22%3E%3Ch2%3EUNH+Dining+%3C%2Fh2%3E%3C%2Fa%3E%3Cp%3E%3Ch2%3EMenus%3C%2Fh2%3E%3C%2Fp%3E&locationNum=30&locationName=Philbrook+Dining+Hall&naFlag=1" 
        },
        default: { hall: "philly", 
            url: "http://foodpro.unh.edu/shortmenu.asp?sName=%3Cbr+%2F%3E%3Ca+href%3D%22http%3A%2F%2Fwww%2Eunh%2Eedu%2Fdining%22%3E%3Ch2%3EUNH+Dining+%3C%2Fh2%3E%3C%2Fa%3E%3Cp%3E%3Ch2%3EMenus%3C%2Fh2%3E%3C%2Fp%3E&locationNum=30&locationName=Philbrook+Dining+Hall&naFlag=1"
        }
    });
    await DiningHalls.findOrCreate({
        where: { hall: "hoco", 
            url: "http://foodpro.unh.edu/shortmenu.asp?sName=%3Cbr+%2F%3E%3Ca+href%3D%22http%3A%2F%2Fwww%2Eunh%2Eedu%2Fdining%22%3E%3Ch2%3EUNH+Dining+%3C%2Fh2%3E%3C%2Fa%3E%3Cp%3E%3Ch2%3EMenus%3C%2Fh2%3E%3C%2Fp%3E&locationNum=80&locationName=Holloway+Commons&naFlag=1" 
        },
        default: { hall: "hoco", 
            url: "http://foodpro.unh.edu/shortmenu.asp?sName=%3Cbr+%2F%3E%3Ca+href%3D%22http%3A%2F%2Fwww%2Eunh%2Eedu%2Fdining%22%3E%3Ch2%3EUNH+Dining+%3C%2Fh2%3E%3C%2Fa%3E%3Cp%3E%3Ch2%3EMenus%3C%2Fh2%3E%3C%2Fp%3E&locationNum=80&locationName=Holloway+Commons&naFlag=1" 
        }
    });
    await DiningHalls.findOrCreate({
        where: { hall: "stillings", 
            url: "http://foodpro.unh.edu/shortmenu.asp?sName=%3Cbr+%2F%3E%3Ca+href%3D%22http%3A%2F%2Fwww%2Eunh%2Eedu%2Fdining%22%3E%3Ch2%3EUNH+Dining+%3C%2Fh2%3E%3C%2Fa%3E%3Cp%3E%3Ch2%3EMenus%3C%2Fh2%3E%3C%2Fp%3E&locationNum=10&locationName=Stillings+Dining+Hall&naFlag=1" 
        },
        // default: { hall: "stillings", 
        //     url: "http://foodpro.unh.edu/shortmenu.asp?sName=%3Cbr+%2F%3E%3Ca+href%3D%22http%3A%2F%2Fwww%2Eunh%2Eedu%2Fdining%22%3E%3Ch2%3EUNH+Dining+%3C%2Fh2%3E%3C%2Fa%3E%3Cp%3E%3Ch2%3EMenus%3C%2Fh2%3E%3C%2Fp%3E&locationNum=10&locationName=Stillings+Dining+Hall&naFlag=1" 
        // }
        // todo figure out if default is actually needed
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