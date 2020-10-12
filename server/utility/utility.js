import axios from 'axios';

const urlItems = 'https://api.mercadolibre.com/items';

function request(resource = '', conf = {}) {
  let params = '';
  if (conf.queryString) {
      params = `?q=${conf.queryString}`;
  } else if (conf.queryParams) {
      params = `/${conf.queryParams}`;
  }
  const url = resource.concat(params);
  return new Promise((resolve) => {
    const request = axios.get(url, onRequestData);
    request.on('error', (error) => { throw error });

    function onRequestData(response) {
        let body = '';
        response.on('data', (chunk) => body += chunk);
        response.on('end', () => {
            const data = JSON.parse(body);
            resolve({ data });
        });
    }
  });
}

function mapItems(items = []) {
  const promises = items.map((item) => getCurrency(item.currency_id).then(({ data }) => buildItemInfo(item, data)));
  return Promise.all(promises);
}

function buildItemInfo(item, currencyData = {}) {
  return {
    id: item.id,
    title: item.title,
    price: {
      currency: currencyData.symbol,
      amount: item.price,
      decimals: currencyData.decimal_places
    },
    picture: item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
    address: item.seller_address.state.name
  };
}

function getCurrency(id) {
  const conf = { queryParams: id };
  return request(`${urlItems}/currencies`, conf);
}

function getItemDescription(id) {
  return request(`${urlItems}/${id}/description`).then(({ data }) => data.plain_text);
}

/**
 * Set the Author values
 * @returns {{name: string, lastname: string}}
 */
function getAuthor() {
  return { name: 'Martin', lastname: 'Eberhardt' };
}

export default {
  request,
  mapItems,
  getItemDescription,
  getAuthor
}
