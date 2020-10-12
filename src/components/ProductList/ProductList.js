import React from 'react';
import _ from 'lodash';

import Spinner from '../../components/Spinner/Spinner';
import ProductCard from '../ProductCard/ProductCard';
import ProductNotFoundMessage from '../ProductNotFoundMessage/ProductNotFoundMessage';
import './ProductList.css';

const ProductList = (props) => {
  // Show spinner when we are fetching data
  if (props.showSpinner) {
    return <Spinner text="Loading Products..." />
  }

  // Show the message after fetch zero products
  if (_.isEmpty(props.products)) {
    return <ProductNotFoundMessage />;
  }

  // Set page tittle
  if (typeof document !== 'undefined') {
    const customTittle = `${props.lastCategory} en Mercado Libre Argentina`;
    document.title = customTittle !== document.title ? customTittle : document.title;
  }

  let products = [];
  if (!_.isEmpty(props.products)) {
    products = props.products.map((product) => {
      return <ProductCard key={product.id} product={product} />;
    });
  }

  return (
    <div className='justify-content-center'>
      <ol id='searchResults' className='list-group container search-results'>
        {products}
      </ol>
    </div>
  );
};

export default ProductList;
