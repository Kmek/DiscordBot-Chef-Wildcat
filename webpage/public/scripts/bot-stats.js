// Script for the main page of the bot stats webpage

//******************** Fill Tables List ********************//
const tablesList = document.getElementById("tablesList");

// Populate the unordered list with a list of models (once)
getModels()
    .then(models => models
        .forEach(table => tablesList.innerHTML += "<li>" + table + "</li>"));

//******************** Fill Dining Halls List ********************//
const diningHallsList = document.getElementById("diningHallsList");

// Populates the list with the names of the dining halls
getTable("DiningHalls")
    .then(halls => halls
        .forEach(hall => diningHallsList.innerHTML += "<li><a href='" + hall.url + "' target='_blank'>" + hall.name + "</a></li>"));

//******************** Fill Data from Subs ********************//
const serversList = document.getElementById("serversList");
const channelsList = document.getElementById("channelsList");

// To prevent duplicates on the list
let servers = [];

// Populates the lists that use data from the Subs table
getTable("Subs")
    .then(subs => subs
        .forEach(sub => {
            if (sub.guildname) {
                if (!servers.includes(sub.guildname)) {
                    serversList.innerHTML += "<li>" + sub.guildname + "</li>";
                    servers.push(sub.guildname);
                }

                // Only duplicates are from different servers
                channelsList.innerHTML += "<li>" + sub.channelname + "</li>";
            }
        }));

//******************** Fill Users List ********************//
const usersList = document.getElementById("usersList");

// Populates the list with the usernames
getTable("DmInfo")
    .then(users => users
        .forEach(user => usersList.innerHTML += "<li>" + user.username + "</li>"));