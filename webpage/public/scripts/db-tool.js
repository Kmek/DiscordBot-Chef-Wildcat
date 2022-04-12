// Script for the DB Viewing Tool

//******************** Fill tablesDiv ********************//
const tablesDiv = document.getElementById("tablesDiv");
const tableDisplay = document.getElementById("tableDisplay");
const tableDisplayTitle = document.getElementById("tableDisplayTitle");
const tableDisplayTimestamp = document.getElementById("tableDisplayTimestamp");

// Populate the div with buttons for each table (once)
getModels()
    .then(models => models
        .forEach(tableName => {
            let btn = document.createElement("button");
            btn.innerHTML = tableName;
            btn.onclick = () => { 
                console.log(tableName + " selected") //fixme
                tableDisplayTitle.innerHTML = tableName + ":";
                tableDisplay.innerHTML = "";

                getTable(tableName)
                    .then(table => {
                        if (table.length == 0) return;
                        let titles = Object.getOwnPropertyNames(table[0]);
                        tableDisplay.style.gridTemplateColumns = "repeat(" + titles.length + ", max-content)";
                        titles.forEach(title => {
                            tableDisplay.innerHTML += "<h3>" + title + "</h3>";
                        });

                        table.forEach(row => {
                            titles.forEach(prop => tableDisplay.innerHTML += "<p>" + row[prop] + "</p>");
                        });
                    });
                
                tableDisplayTimestamp.innerHTML = "Updated: " + new Date(Date.now());
            };

            tablesDiv.appendChild(btn);
        }));