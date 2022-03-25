// Helper functions for manipulating the postgres database

const { MessageEmbed } = require('discord.js');
const { DiningHalls } = require("../models/dininghalls");
const axios = require('axios');
const cheerio = require('cheerio');

// Function for scraping the menu items out of the div and into a list
const extractMenuItemsFromDiv = ($, mealtime) => [
	...new Set(
		$("#" + mealtime + " table.meal-column tr td div") // Select meal div
			.map((_, a) => $(a).text())
			.toArray() // Convert cheerio object to array
	),
];

module.exports = {
    // Function for finding the id of a hall given the hall name
    async diningHallToId(hallName) {
        let toReturn = null;
        await DiningHalls.findAll({
                where: {
                    hall: hallName
                }
            }).then(x => {
                // todo check that element was found first, return default value if not
                // console.log("id: " + x[0].id);
                toReturn = x[0].id;
            }).catch(e => {
                console.log('Oops! something went wrong, : ', e);
            });
        return toReturn;
    },
    // Function for getting the name of a dining hall given the id
    async idToDiningHall(id) {
        // todo
        // question needed?
    },
    // Gets today's date
    todayDate() { // question needed?
        return new Date();
    },
    // Prints the output of pg fetch into a printable table
    toTable(rows) {
        let arr = [];
        // for (const r in rows) {
        rows.forEach(r => {
            arr.push(r.dataValues);
        })
        console.table(arr);
    },
    // Gets the url of the hall given the name
    async getHallUrl(hallName) {
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
        console.log(toReturn); // fixme remove
        return toReturn;
    },
    // Scrapes the given url for a list of menu items
    // Note that mealtime must be either 'Breakfast' 'Lunch' or 'Dinner' (caps matter!)
    async scrapeUrl(menuUrl, mealtime) {
        console.log("Starting scrape"); // fixme remove

        // todo check if in scrape db and save in scrape db

        // console.log("URL is " + menuUrl); // fixme remove

        let items = "FAILED"; // For if the scrape fails

        try {
            await axios.get(menuUrl).then(({ data }) => {
                const $ = cheerio.load(data); // Initialize cheerio
                items = extractMenuItemsFromDiv($, mealtime); 
                // console.log(items);
            });
        } catch (e) {
            console.log(e);
            console.warn("ERROR: Unable to scrape!");
        } // todo then?


        return items;
    },
    // Builds a DiscordJS embed message with each menu section being its own embed field
    createEmbedMessage(data, menuUrl, mealtime, diningHall) {
        let embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(mealtime + ' Menu')
            .setURL(menuUrl)
            .setAuthor({ name: diningHall, iconURL: 'https://i.imgur.com/AfFp7pu.png', url: menuUrl })
            .setDescription('Some description here') // todo add date of menu
            .setThumbnail('https://i.imgur.com/AfFp7pu.png') // todo change image
            .setTimestamp()
            .setFooter({ text: diningHall + ' ' + mealtime + ' Menu', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

        let title = data[0], list = "";
        for (let i = 1; i < data.length; i++) {
            if ((data[i]).startsWith("-- ")) {
                embed.addField(title, list, true); // todo add compact as a server subscription option?
                // console.log(i, data[i])
                title = data[i];
                list = "";
            } else {
                // console.log("\t" + i + " " + data[i])
                list += "- " + data[i] + "\n";
                // todo somehow mark favorite items with a star?
            }
        }
        embed.addField(title, list, true);
        // Even out last row
        for (i = 0; i < (embed.fields.length % 3); i) {
            embed.addField("\u200B", "\u200B", true);
        }
        return embed;
    }
};

// question needed?
// function toYMD(date) {
//     let formatted = "" + date.getFullYear();
//     formatted += "-" + (date.getMonth() + 1);
//     formatted += "-" + (date.getDay() + 1);
//     console.log(date," to ", formatted);
//     return formatted;
// }