// const Puppeteer = require('puppeteer');

// async function scrape() { // todo fixme remove and replace with library function
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
// console.log(scrape());

//**************************** Axios and cheerio ****************************//
// const axios = require('axios'); 
// // axios.get('https://scrapeme.live/shop/') 
// // 	.then(({ data }) => console.log(data));
// axios.get('http://foodpro.unh.edu/shortmenu.asp?sName=%3Cbr+%2F%3E%3Ca+href%3D%22http%3A%2F%2Fwww%2Eunh%2Eedu%2Fdining%22%3E%3Ch2%3EUNH+Dining+%3C%2Fh2%3E%3C%2Fa%3E%3Cp%3E%3Ch2%3EMenus%3C%2Fh2%3E%3C%2Fp%3E&locationNum=30&locationName=Philbrook+Dining+Hall&naFlag=1') 
// 	.then(({ data }) => console.log(data));

// const axios = require('axios'); 
// const cheerio = require('cheerio'); 
 
// const extractLinks = $ => [ 
// 	...new Set( 
// 		$("#Lunch table.meal-column tr td div") // Select pagination links 
// 			.map((_, a) => $(a).text())
// 			.toArray() // Convert cheerio object to array 
// 	), 
// ]; 
 
// axios.get('http://foodpro.unh.edu/shortmenu.asp?sName=%3Cbr+%2F%3E%3Ca+href%3D%22http%3A%2F%2Fwww%2Eunh%2Eedu%2Fdining%22%3E%3Ch2%3EUNH+Dining+%3C%2Fh2%3E%3C%2Fa%3E%3Cp%3E%3Ch2%3EMenus%3C%2Fh2%3E%3C%2Fp%3E&locationNum=30&locationName=Philbrook+Dining+Hall&naFlag=1').then(({ data }) => { 
// 	const $ = cheerio.load(data); // Initialize cheerio 

//     // const content = extractContent($); 
//     // console.log(content)

// 	const items = extractMenuItemsFromDiv($); 
 
// 	console.log(items); 
// });

const { scrapeUrl } = require('./db-helpers');

(async () => {
    console.log("returned: ", await scrapeUrl("asdf", "Lunch"));
})();