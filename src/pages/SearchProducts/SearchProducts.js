import React, { Component } from 'react';
import "isomorphic-fetch";

import API from '../../services/api';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProductsList from '../../components/ProductList/ProductList';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';

class SearchProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
        products: [],
        categories: [],
        showSpinner: false
    };
    this.search = this.search.bind(this);
    this.parseQuery = this.parseQuery.bind(this);
  }

  search(query) {
    this.setState({ products: [], showSpinner: true });
    API.getItemsByQuery(query)
      .then(({ items: products, categories }) => {
        this.setState({ 
          products,
          categories,
          showSpinner: false
        });
      })
      .catch((error) => {
        console.warn('Query error', error);
        alert('Ocurrio un error, revisar la consola');
      });
  }

  parseQuery(search) {
    const params = new URLSearchParams(search);
    return params.get('search') || '';
  }

  componentWillReceiveProps(nextProps) {
    const newQuery = this.parseQuery(nextProps.location.search);
    const oldQuery = this.parseQuery(this.props.location.search);

    const areValidQuery = newQuery && oldQuery;
    const areDifferentQueries = newQuery !== oldQuery;

    if (areValidQuery && areDifferentQueries) {
      this.search(newQuery);
    }
  }
  
  componentDidMount() {
    const query = this.parseQuery(this.props.location.search);
    if (query) {
      this.search(query);
    }
  }

  render() {
    const lastCategory = this.state.categories ? this.state.categories[this.state.categories.length-1] : [];
    return (
      <div className="app-container">
        <SearchBar history={this.props.history} />
        <h1 className='hidden-title'>{this.state.search} - Mercado Libre Test</h1>
        <BreadCrumbs crumbs={this.state.categories} />
        <main className="app-content">
          <ProductsList
            lastCategory={lastCategory}
            products={this.state.products}
            showSpinner={this.state.showSpinner}
          />
        </main>
      </div>
    );
  }
}

export default SearchProducts;