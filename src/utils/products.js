// const GoogleSpreadsheet = require('google-spreadsheet');
const request = require('request');
const cheerio = require('cheerio');
const jsdom = require("jsdom");
var htmlParser = require('html-parser');
// //https://docs.google.com/spreadsheets/d/e/2PACX-1vSntCTOmZ_mt1qg-dCesbV9qubCN5vXRxpoVVrSmXhNIbw7H8NrM1L6WEMV7fDc6CHz5glEcQtm17UC/pubhtml

// const doc = new GoogleSpreadsheet(process.env.GOOGLE_SECRET);

// const getProducts = (callback) => {
//   doc.getRows(1, {
//     offset: 1
//   }, (err, rows) => {
//     if (err) {
//       callback('Unable to connect', undefined)
//     } else {
//       callback(undefined, rows)
//     }
//   });
// }
const getProducts = (callback) => {
  const url = 'https://www.familytravel.com.au/wp-json/wc/v2/products?status=publish&type=tour'
  request({ url, json: true }, (error, response) => {
      if (error){
        callback('Unable to connect to woocommerce', undefined)
      } else if (response.body.length === 0) {
        callback('No live tour products.', undefined)
      } else {
        //response.body.adultfrom = response.body.

        response.body.forEach((product) => {
          var $
          product.meta_data.forEach((data) => {
            if (data.key == '_price_text'){
              $ = cheerio.load(data.value)
              var text = $('.price-text').text()
              product.fromadult = text
            }
            if (data.key == '_price_text_second') {
              $ = cheerio.load(data.value)
              var text = $('.price-text').text()
              product.fromchild = text
            }
          })
          product.attributes.forEach((data) => {
            if (data.name == 'Duration' && data.visible) {
              product.nights = data.options[0]
            }
          })
        })
        callback(undefined, response.body)
      }
    })
    .auth(process.env.WOOCOMMERCE_USER, process.env.WOOCOMMERCE_SECRET, true);
 }



module.exports = getProducts;