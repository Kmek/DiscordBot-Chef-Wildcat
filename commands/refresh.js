// Refresh command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

// fixme remove after testing
const Puppeteer = require('puppeteer');
async function scrape() {
    console.log("Starting scrape")
    const browser = await Puppeteer.launch({ /*headless: false*/ })
    const page = await browser.newPage()

    await page.goto('http://foodpro.unh.edu/shortmenu.asp?sName=%3Cbr+%2F%3E%3Ca+href%3D%22http%3A%2F%2Fwww%2Eunh%2Eedu%2Fdining%22%3E%3Ch2%3EUNH+Dining+%3C%2Fh2%3E%3C%2Fa%3E%3Cp%3E%3Ch2%3EMenus%3C%2Fh2%3E%3C%2Fp%3E&locationNum=30&locationName=Philbrook+Dining+Hall&naFlag=1')

    // // Testing grabbing single line of text
    // var element = await page.waitForSelector("#Lunch > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > div")  
    // var text = await page.evaluate(element => element.textContent, element)
    // console.log(text)

    // Lunch menu
    const data = await page.evaluate(() => {
        const list = []
        var lunchTable = document.querySelectorAll("#Lunch table.meal-column tr td div")
        for (const item of lunchTable) {
            list.push(item.innerHTML);
        }
        return list;
    })
    console.log(data);

    browser.close()
    console.log("END");
    return data;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('refresh')
        .setDescription('Print the current menu from UNH dining'),
    async execute(interaction) {
        await interaction.deferReply();

        let data = await scrape();

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Lunch Menu')
            // .setURL('https://discord.js.org/') // todo add dining hall url
            .setAuthor({ name: 'Philbrook', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
            .setDescription('Some description here') // todo add date of menu
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter({ text: 'Philbrook Lunch Menu', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

        let title = data[0], list = "";
        for (let i = 1; i < data.length; i++) {
            if ((data[i]).startsWith("-- ")) {
                embed.addField(title, list, true); // todo add compact as a server subscription option
                // console.log(i, data[i])
                title = data[i];
                list = "";
            } else {
                // console.log("\t" + i + " " + data[i])
                list += "- " + data[i] + "\n";
            }
        }
        embed.addField(title, list, true);
        // Even out last row
        for (i = 0; i < (embed.fields.length % 3); i) {
            embed.addField("\u200B", "\u200B", true);
        }
        
        
        await interaction.editReply({ embeds: [embed, embed]});
        // await interaction.followUp('Pong again!');
    }
};