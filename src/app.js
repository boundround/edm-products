require('dotenv').config();
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getProducts = require('./utils/products')

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('', {    
  });
})

app.get('/products', (req, res) => {
  getProducts((error, products) => {
    if (error) {
      return res.send({error})
    }
    return res.send({
      products: products
    });
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})