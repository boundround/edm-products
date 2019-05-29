const request = require('request');
const cheerio = require('cheerio');
const jsdom = require("jsdom");
var htmlParser = require('html-parser');

const getProducts = (callback) => {
  const url = 'https://www.familytravel.com.au/wp-json/wc/v2/products?status=publish&type=tour'
  request({ url, json: true }, (error, response) => {
      if (error){
        callback('Unable to connect to woocommerce', undefined)
      } else if (response.body.length === 0) {
        callback('No live tour products.', undefined)
      } else {
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