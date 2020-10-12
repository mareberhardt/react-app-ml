import axios from 'axios';

const urlItemById = 'https://api.mercadolibre.com/items';
const apiUrl = 'https://api.mercadolibre.com/';

/* 
 * Item https://api.mercadolibre.com/items/ID
 */
function ItemById(id, res) {
  let params = '';
  if (id) {
    params = `/${id}`;
  }
  const url = urlItemById.concat(params);
  axios.get(url).then((response) => {
    axios.get(`${url}/description`).then((description) => {
      axios.get(`${apiUrl}categories/${response.data.category_id}`).then((category) => {
        res.json(formatResponse(response.data, description.data, category.data));
      });
    });
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
function formatResponse(product, description, category) {
  const formattedResponse = {};
  formattedResponse.author = getAuthor();
  formattedResponse.item = getItemValues(product, description, category);

  return formattedResponse;
}

/**
 * Set Item values
 * @param product
 * @param description
 * @returns {{}}
 */
function getItemValues(product, description, category) {
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
  formattedProduct.description = description.plain_text;
  formattedProduct.categories = category.path_from_root.map(
    (category) => {
      return category.name;
    }
  );

  return formattedProduct;
}

export default ItemById;