console.log('From Client Side JS');

fetch('/products').then((response) => {
  response.json().then((data) => {
    data.products.forEach((product) => {
      drawProduct(product);
    })
  })
})

const drawProduct = (product) => {
  const source = document.getElementById('product-template').innerHTML;
  const template = Handlebars.compile(source);
  const productInfo = {
    dealname: product.dealname,
    tagline: product.tagline
  }
  const html = template(productInfo);
  console.log(html)
  const productsContainer = document.querySelector('.products-container');
  productsContainer.innerHTML += html;
}