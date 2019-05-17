console.log('From Client Side JS');

fetch('/products').then((response) => {
  response.json().then((data) => {
    data.products.forEach((product) => {
      console.log(product);
      // if (product.perchildfrom == 0){
      //   product.perchildfrom = "Free";
      // };
      drawProduct(product);
    })
  })
})

const drawProduct = (product) => {
  const source = document.getElementById('product-template').innerHTML;
  const template = Handlebars.compile(source);
  const productInfo = {
    dealname: product.name,
    tagline: product.short_description,
    datecreated: product.date_created,
    destination: 'need destination',
    id: product.id,
    numberofnights: 'need nights',
    peradultfrom: '$999999',
    perchildfrom: '$9999',
    photo: product.images[0].src,
    description: product.description
  }
  const html = template(productInfo);
  const productsContainer = document.querySelector('.products-container');
  productsContainer.innerHTML += html;
}