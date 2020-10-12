import axios from 'axios';

const urlItemsSearch = 'https://api.mercadolibre.com/sites/MLA/search';
const resultsQty = 4;

/* 
 * Query https://api.mercadolibre.com/sites/MLA/search?q=:query
 */
function ItemsByQuery(conf, res) {
  let params = '';
  if (conf) {
    params = `?q=${conf}`;
  }
  const url = urlItemsSearch.concat(params);
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  axios.get(`${url}&limit=${resultsQty}`)
    .then((response) => {
      res.json(formatResponse(response.data));
    })
    .catch((err) => {
      res.send(err);
    });
}

/**
 * Format the json response
 * @param response
 * @returns {{}}
 */
function formatResponse(response) {
  const formattedResponse = {};

  formattedResponse.author = getAuthor();
  formattedResponse.categories = getCategories(response.filters);
  formattedResponse.items = getItems(response.results);

  return formattedResponse;
}

/**
 * Set the Author value
 * @returns {{name: string, lastname: string}}
 */
function getAuthor() {
  return { name: 'Martin', lastname: 'Eberhardt' };
}

/**
 * Set the Categories value
 * @param filters
 * @returns {Array}
 */
function getCategories(filters) {
  const trueFilters = !!filters[0] ? filters[0] : {};
  let categories = [];

  if (!!filters
    && trueFilters.values.length
    && trueFilters.values[0].path_from_root.length
  ) {
    categories = trueFilters.values[0].path_from_root.map((category) => {
      return category.name;
    });
  }

  return categories;
}

/**
 * Set the Items value
 * @param items
 * @returns {Array}
 */
function getItems(items) {
  return items.map((item) => {
    return {
      id: item.id,
      title: item.title,
      price: {
        amount: item.price,
        currency: item.currency_id,
        //  TODO Check for decimals on the api response
      },
      picture: formatImg(item.thumbnail),
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      address: item.address.state_name };
  });
}

/**
 * Get good quality img
 * Clarification: This maybe is not right but the thumbnails are too small
 * @param img
 * @returns {string}
 */
function formatImg(img) {
  const regex = /(\d{6}-MLA\d{11}_\d{6})/g;
  const match = regex.exec(img);
  return `https://http2.mlstatic.com/D_Q_NP_${match[1]}-Q.webp'`;
}

export default ItemsByQuery;