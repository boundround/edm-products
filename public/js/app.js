console.log('From Client Side JS');

fetch('/products').then((response) => {
  response.json().then((data) => {
    data.products.forEach((product) => {
      console.log(product);
      drawProduct(product);
    })
  })
})

const drawProduct = (product) => {
  const source = document.getElementById('product-template').innerHTML;
  const template = Handlebars.compile(source);
  const productInfo = {
    dealname: '5 Nights at Test Location',
    tagline: '<p>This is a short tagline. This place is awesome</p>',
    datecreated: product.date_created,
    destination: 'China',
    id: product.id,
    numberofnights: product.nights,
    peradultfrom: product.fromadult,
    perchildfrom: product.fromchild,
    photo: product.images[0].src,
    description: 'One line short description',
    excerpt: 'One line excerpt'
  }
  const html = template(productInfo);
  const productsContainer = document.querySelector('.products-container');
  productsContainer.innerHTML += html;
}