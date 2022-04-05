// Script to start the webserver

/******************** Express App Setup ********************/
const express = require('express');
const path = require('path');

const app = express();

// Start in container or on its own
const port = process.env.EXTERNAL_PORT || 8080;
let host = '0.0.0.0';
if (!process.env.EXTERNAL_PORT) {
    host = "localhost";
}

// Expose the public folder for the page
app.use(express.static(__dirname + '/public'));

// Use index.html as the first page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Start
app.listen(port, host);
console.log('Server started at http://localhost:' + port);

// /******************** Sequelize -> PG Connection ********************/
// // https://stackabuse.com/using-sequelize-orm-with-nodejs-and-express/
// const { sequelizeInstance } = require('../chefwildcat-bot/util/database.js');

// sequelizeInstance
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// // Connect to PostgreSQL
// (async () => {
//     try {
//         // await sequelizeInstance.sync();
//         // await sequelizeInstance.sync({ force: true }); // For recreating tables
//         await sequelizeInstance.sync({ alter: true }) // For updating models with saving rows as best as possible
//         console.log("Connection to postgres complete!\n");
//     } catch (e) {
//         console.log(e);
//         console.log("ERROR: unable to connect to db!");
//         process.exit();
//     }
// })();

// /******************** Endpoints ********************/
// const { DiningHalls } = require('../chefwildcat-bot/models/dininghalls');
// const { ScrapeCache } = require('../chefwildcat-bot/models/scrapecache');
// const { Subs } = require('../chefwildcat-bot/models/subs');
// const { DmInfo } = require('../chefwildcat-bot/models/dminfo');

// app.get('/getDiningHalls', function(req, res) {
//     console.log("Fetching /getDiningHalls");
//     DiningHalls.findAll().then(notes => res.json(notes));
// });

// app.get('/getScrapeCache', function(req, res) {
//     console.log("Fetching /getScrapeCache");
//     ScrapeCache.findAll().then(notes => res.json(notes));
// });

// app.get('/getSubs', function(req, res) {
//     console.log("Fetching /getSubs");
//     Subs.findAll().then(notes => res.json(notes));
// });

// app.get('/getDmInfo', function(req, res) {
//     console.log("Fetching /getDmInfo");
//     DmInfo.findAll().then(notes => res.json(notes));
// });