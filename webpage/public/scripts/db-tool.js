// Script for the DB Viewing Tool

//******************** Fill tablesDiv ********************//
const tablesDiv = document.getElementById("tablesDiv");

// Populate the div with buttons for each table (once)
getModels()
    .then(models => models
        .forEach(table => {
            let btn = document.createElement("button");
            btn.innerHTML = table;
            btn.onclick = () => { console.log(table) };

            tablesDiv.appendChild(btn);
        }));