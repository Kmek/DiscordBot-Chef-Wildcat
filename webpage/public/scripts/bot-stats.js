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