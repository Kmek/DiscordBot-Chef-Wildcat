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
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
// Give the DB tool its own page
app.get('/DbTool', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/db.html'));
});

// Start
app.listen(port, host);
console.log('Server started at http://localhost:' + port);

// /******************** Sequelize -> PG Connection ********************/
// https://stackabuse.com/using-sequelize-orm-with-nodejs-and-express/
const { sequelizeInstance } = require('../chefwildcat-bot/util/database.js');

sequelizeInstance
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Connect to PostgreSQL
(async () => {
    try {
        await sequelizeInstance.sync();
        console.log("Connection to postgres complete!\n");
    } catch (e) {
        console.log(e);
        console.log("ERROR: unable to connect to db!");
        process.exit();
    }
})();

/******************** Endpoints ********************/

// Need to import models to access them
const fs = require('fs');
const modelFiles = fs.readdirSync('./chefwildcat-bot/models').filter(file => file.endsWith('.js'));
for (const f of modelFiles) {
    const dbTable = require("../chefwildcat-bot/models/" + f);
}

// Gets a list of the tables in the db (aka the models)
app.get('/getModels', function(req, res) {
    console.log("Fetching /getModels");
    res.send(JSON.stringify(Object.getOwnPropertyNames(sequelizeInstance.models))); 
});

// Gets the corresponding db table in the query
app.get('/getTable', function(req, res) {
    console.log("Fetching /getTable for " + req.query.table);
    // todo check model exists, if not then return empty
    sequelizeInstance.models[req.query.table].findAll().then(x => res.json(x));
});