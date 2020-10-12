import axios from 'axios';

const urlItemById = 'https://api.mercadolibre.com/items';

/* 
 * Item https://api.mercadolibre.com/items/ID
 */
function ItemById(id, res) {
  const formattedResponse = {};
  let params = '';
  if (id) {
    params = `/${id}`;
  }
  const url = urlItemById.concat(params);

  axios.get(url)
    .then((response) => {
      formattedResponse.author = getAuthor();
      formattedResponse.item = setItemValues(response.data);
      res.json(formattedResponse);
    })
    .catch((err) => {
      res.send(err);
    });
}

/**
 * Set the Author value
 * @returns {{name: string, lastname: string}}
 */
function getAuthor() {
  return { name: 'Martin', lastname: 'Eberhardt' };
}

/**
 * Set Item values
 * @param product
 * @param description
 * @returns {{}}
 */
function setItemValues(product) {
  const formattedProduct = {};

  formattedProduct.id = (product.id);
  formattedProduct.title = (product.title);
  formattedProduct.price = {
    amount: product.price,
    currency: product.currency_id };

  if (product.pictures.length) {
    formattedProduct.picture = product.pictures[0].secure_url;
  }

  formattedProduct.condition = product.condition === 'new' ? 'New' : 'Used';
  formattedProduct.free_shipping = product.shipping.free_shipping;
  formattedProduct.sold_quantity = product.sold_quantity;
  formattedProduct.description = product.descriptions[0].id;

  // This is out of the scope of the test.
  formattedProduct.permalink = product.permalink;

  return formattedProduct;
}

export default ItemById;