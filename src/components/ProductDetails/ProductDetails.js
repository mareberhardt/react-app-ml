import React from 'react';
import _ from 'lodash';

import Spinner from '../../components/Spinner/Spinner';
import ProductNotFoundMessage from '../ProductNotFoundMessage/ProductNotFoundMessage';
import './ProductDetails.css';

const ProductDetails = (props) => {
  // Show spinner when we are fetching data
  if (props.showSpinner) {
    return <Spinner text="Loading Product Details..." />
  }

  // Show the message after fetch zero products
  if (_.isEmpty(props.product)) {
    return <ProductNotFoundMessage />;
  }

  // Set page tittle
  if (typeof document !== 'undefined') {
    const customTittle = `${props.product.title} - 
      ${props.product.price.amount} in Mercado Libre`;
    document.title = customTittle !== document.title ? customTittle : document.title;
  }

  // Format Description (Maybe this should be doned on the API)
  const description = props.product.description.split('\n').map((item, key) => {
    return (_.isString(item) ? !!_.trim(item) : _.isEmpty(item))
      ? <span key={key}>{item}<br /></span> : <br key={key} />;
  });

  return (<div className='container product-container'>
    <div className='row'>
      <div className='col'>
        <div className='product-details'>
          <div className='product-gallery'>
            <img src={props.product.picture} alt='Product' />
          </div>
        </div>
      </div>
      <div className='col-3'>
        <div className='product-information'>
          <div className='product-status'>
            {props.product.condition}{props.product.sold_quantity !== 0
            ? ` - ${props.product.sold_quantity} selled`
            : ''}
          </div>
          <h1 className='product-title'>
            {props.product.title}
          </h1>
          <div className='product-price'>
            {props.product.price.amount}
          </div>
          <div className='product-purchase'>
            <a href={props.product.permalink}>
              <button
                title={`Compare ${props.product.title}`}
                className='btn'>
                { 'Compare' }
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className='row'>
      <div className='col-9'>
        <div className='product-details'>
          <div className='product-descripcion'>
            <div className='product-descripcion-title'>
              Product Description
            </div>
            <p className='product-descripcion-text'>
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>);
};

export default ProductDetails;
