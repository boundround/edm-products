console.log('From Client Side JS');

fetch('/products').then((response) => {
  response.json().then((data) => {
    data.products.forEach((product) => {
      console.log(product)
      drawProduct(product);
    })
  })
})

const drawProduct = (product) => {
  const source = document.getElementById('product-template').innerHTML;
  const template = Handlebars.compile(source);
  const productInfo = {
    dealname: product.dealname,
    tagline: product.tagline,
    datecreated: product.datecreated,
    destination: product.destination,
    id: product.id,
    numberofnights: product.numberofnights,
    peradultfrom: product.peradultfrom,
    perchildfrom: product.perchildfrom,
    photo: product.photo
  }
  const html = template(productInfo);
  const productsContainer = document.querySelector('.products-container');
  productsContainer.innerHTML += html;
}