// Philly menu command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getHallUrl, scrapeUrl, createEmbedMessage } = require('../util/db-helpers.js');

// fixme remove after testing
// const Puppeteer = require('puppeteer');
// async function scrape() {
//     console.log("Starting scrape")
//     const browser = await Puppeteer.launch({ /*headless: false*/ })
//     const page = await browser.newPage()

//     await page.goto('http://foodpro.unh.edu/shortmenu.asp?sName=%3Cbr+%2F%3E%3Ca+href%3D%22http%3A%2F%2Fwww%2Eunh%2Eedu%2Fdining%22%3E%3Ch2%3EUNH+Dining+%3C%2Fh2%3E%3C%2Fa%3E%3Cp%3E%3Ch2%3EMenus%3C%2Fh2%3E%3C%2Fp%3E&locationNum=30&locationName=Philbrook+Dining+Hall&naFlag=1')

//     // // Testing grabbing single line of text
//     // var element = await page.waitForSelector("#Lunch > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > div")  
//     // var text = await page.evaluate(element => element.textContent, element)
//     // console.log(text)

//     // Lunch menu
//     const data = await page.evaluate(() => {
//         const list = []
//         var lunchTable = document.querySelectorAll("#Lunch table.meal-column tr td div")
//         for (const item of lunchTable) {
//             list.push(item.innerHTML);
//         }
//         return list;
//     })
//     console.log(data);

//     browser.close()
//     console.log("END");
//     return data;
// }

module.exports = {
    data: new SlashCommandBuilder()
        .setName('philly')
        .setDescription('Print the current menu from Philbrook dining hall'),
    async execute(interaction) {
        // Get 15 minutes for the message
        await interaction.deferReply();

        // todo check ScrapeCache, update if scrape was needed

        let url = await getHallUrl("philly");
        let data = await scrapeUrl(url, "Lunch");

        let embed = createEmbedMessage(data, url, "Lunch", "Philbrook");

        await interaction.editReply({ embeds: [embed]});
    }
};