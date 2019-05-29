console.log('From Client Side JS');

fetch('/products').then((response) => {
  response.json().then((data) => {
    data.products.forEach((product) => {
      console.log(product);
      if (product.fromchild == '$0'){
        product.fromchild = "Free";
      };
      drawProduct(product);
    })
  })
})

const drawProduct = (product) => {
  const source = document.getElementById('product-template').innerHTML;
  const template = Handlebars.compile(source);
  const productInfo = {
    dealname: product.name,
    tagline: product.meta_data.filter(item => item.key == 'marketing_tagline')[0].value,
    datecreated: product.date_created,
    destination: product.meta_data.filter(item => item.key == 'marketing_destination')[0].value,
    id: product.id,
    numberofnights: product.nights,
    peradultfrom: product.fromadult,
    perchildfrom: product.fromchild,
    photo: product.images[0].src,
    description: product.meta_data.filter(item => item.key == 'marketing_description')[0].value
  }
  const html = template(productInfo);
  const productsContainer = document.querySelector('.products-container');
  productsContainer.innerHTML += html;
}