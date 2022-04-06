// Script for the main page of the bot stats webpage

//******************** Fill tablesList ********************//
const tablesList = document.getElementById("tablesList");

// Populate the unordered list with a list of models (once)
getModels()
    .then(models => models
        .forEach(table => tablesList.innerHTML += "<li>" + table + "</li>"));