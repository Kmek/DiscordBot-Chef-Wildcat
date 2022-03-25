// For random testing

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