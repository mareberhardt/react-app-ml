import React, { Component } from 'react';
import "isomorphic-fetch";

import API from '../../services/api';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      showSpinner: false
    };
    this.search = this.search.bind(this);
  }

  search() {
    this.setState({ showSpinner: true });
    API.getItemById(this.props.match.params.id)
      .then((data) => {
        this.setState({
          product: data.item,
          categories: data.item.categories,
          showSpinner: false 
        });
      })
      .catch((error) => {
        this.setState({ showSpinner: true });
        console.warn('Query error', error);
        alert('Ocurrio un error, revisar la consola');
      });
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.search();
    }
  }


  render() {
    return (
      <div className="app-container">
        <SearchBar history={this.props.history} />
        <BreadCrumbs crumbs={this.state.categories} />
        <main className="app-content">
          <ProductDetails
            product={this.state.product}
            showSpinner={this.state.showSpinner}
          />
        </main>
      </div>
    );
  }
}

export default Product;