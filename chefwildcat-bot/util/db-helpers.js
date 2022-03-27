// Helper functions for manipulating the postgres database

const { MessageEmbed } = require('discord.js');
const { diningHallToId, getHallUrl } = require("../models/dininghalls");
const { getCachedScrape, saveScrapeToCache } = require("../models/scrapecache");
const axios = require('axios');
const cheerio = require('cheerio');

// Function for scraping the menu items out of the div and into a list
const extractMenuItemsFromDiv = ($, mealTime) => [
	...new Set(
		$("#" + mealTime + " table.meal-column tr td div") // Select meal div
			.map((_, a) => $(a).text())
			.toArray() // Convert cheerio object to array
	),
];

/******************** Exports ********************/

// Gets today's date
exports.todayDate = () => {
    return new Date();
}

// Prints the output of pg fetch into a printable table
exports.toTable = (rows) => {
    let arr = [];
    // for (const r in rows) {
    rows.forEach(r => {
        arr.push(r.dataValues);
    })
    console.table(arr);
}

exports.printDB = (model) => {
    model.findAll()
        .then(x => {
            // console.log(x);
            exports.toTable(x);
        }).catch(e => {
            console.log('Oops! something went wrong, : ', e);
        });
}

// question needed?
// function toYMD(date) {
//     let formatted = "" + date.getFullYear();
//     formatted += "-" + (date.getMonth() + 1);
//     formatted += "-" + (date.getDay() + 1);
//     console.log(date," to ", formatted);
//     return formatted;
// }

// Scrapes the given url for a list of menu items
// Note that mealtime must be either 'Breakfast' 'Lunch' or 'Dinner' (caps matter!)
exports.scrapeUrl = async (hallName, mealTime, menuUrl) => {
    // Check if already in scrape db
    let items = await getCachedScrape(hallName, mealTime.toLowerCase(), exports.todayDate());
    if (items === null || items.length > 0) {
        return items;
    }

    try {
        console.log("\t\tStarting scrape");
        await axios.get(menuUrl).then(({ data }) => {
            const $ = cheerio.load(data); // Initialize cheerio
            items = extractMenuItemsFromDiv($, mealTime); 
        });

        // Then save in scrape db
        saveScrapeToCache(hallName, mealTime.toLowerCase(), exports.todayDate(), items);

    } catch (e) {
        console.log(e);
        console.warn("ERROR: Unable to scrape!");
    }

    return items;
}

// Builds a DiscordJS embed message with each menu section being its own embed field
exports.createEmbedMessage = (data, menuUrl, mealtime, diningHall) => {
    let embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(mealtime + ' Menu')
        .setURL(menuUrl)
        .setAuthor({ name: diningHall, iconURL: 'https://i.imgur.com/0ZodGCo.png', url: menuUrl })
        .setDescription('Some description here') // todo add date of menu
        .setThumbnail("https://i.imgur.com/0ZodGCo.png")
        .setTimestamp()
        .setFooter({ text: diningHall + ' ' + mealtime + ' Menu', iconURL: 'https://i.imgur.com/0ZodGCo.png' });

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
            // todo somehow mark favorite items with a star? or somewhere else?
        }
    }
    embed.addField(title, list, true);
    // Even out last row
    for (i = 0; i < (embed.fields.length % 3); i) {
        embed.addField("\u200B", "\u200B", true);
    }
    return embed;
}

// Gets an embed message for the given hall and meal
exports.buildEmbedMessage = async (hallName, mealTime) => {
    console.log("\t" + mealTime);
    let url = await getHallUrl(hallName);
    let data = await exports.scrapeUrl(hallName, mealTime, url);
    if (data.length == 0) { return null; }
    let embed = await exports.createEmbedMessage(data, url, mealTime, hallName);
    return embed;
}

// Get all 3 menus for a dining hall
exports.buildAllMenuEmbedMessages = async (hallName) => {
    let embeds = [];

    let mealTimes = ["Breakfast", "Lunch", "Dinner"];
    for (const mealTime of mealTimes) {
        let embed = await exports.buildEmbedMessage(hallName, mealTime)
        if (embed) { embeds.push(embed); }
    }

    return embeds;
}

// Get all menus for the given mealtime
exports.buildAllMealEmbedMessages = async (mealTime) => {
    let embeds = [];

    let halls = ["philly", "hoco", "stillings"];
    for (const hall of halls) {
        let embed = await exports.buildEmbedMessage(hall, mealTime);
        if (embed) { embeds.push(embed) }
    }

    return embeds;
} 
// idea combine this and the above into one condensed function

// Sends all of the given embedded messages
exports.sendAllEmbedMessages = async (interaction, embeds) => {
    // embeds = await exports.buildAllMealEmbedMessages(mealTime);

    if (embeds.length == 0) {
        console.log("\tNo menu items found");
        await interaction.editReply("Error: No menus found");
        return 0;
    }

    for (let i = 0; i < embeds.length; i++) {
        await interaction.followUp({ embeds: [embeds[i]] });
    }
}