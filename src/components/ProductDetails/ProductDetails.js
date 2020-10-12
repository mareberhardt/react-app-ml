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

  const description = props.product.description.split('\n').map((item, key) => {
    return (_.isString(item) ? !!_.trim(item) : _.isEmpty(item))
      ? <span key={key}>{item}<br /></span> : <br key={key} />;
  });


  let productDOM = (<section></section>);

    const productInfo = (
        <section className="product-details">
            <article className="product-details-container">
                <img alt={props.product.title} src={props.product.picture} className="product-details-image" />
                <div className="product-details-footer">
                    <h1 className="product-details-footer-title">Product's Description</h1>
                    <p className="product-details-footer-description">{description ||
                      `${props.product.title} There is no description for this product`}</p>
                </div>
            </article>
            <aside className="product-details-header">
                <h6 className="product-details-header-condition-sold product-details-header-condition-sold-capitalized">{props.product.condition} - {props.product.sold_quantity} sold</h6>
                <h1 className="product-details-header-title product-details-header-title-capitalized">{props.product.title}</h1>
                <h4 className="product-details-header-price">$ {Number(props.product.price.amount).toLocaleString('es')}</h4>
                <button type="button" className="product-details-header-btn-buy">Buy</button>
            </aside>
        </section>
    );
    if (props.product.id) {
        productDOM = productInfo;
    }
    return productDOM;
}

export default ProductDetails;
