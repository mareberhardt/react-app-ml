import React, { Component } from 'react';

import Logo from '../Logo/Logo';
import SearchImg from '../../assets/images/ic_Search.png';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(event) {
    this.setState({
      search: event.currentTarget.value
    });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    if (this.state.search) {
      this.props.history.push(`/items?search=${this.state.search}`);
    }
  }

  render() {
    return (
      <div className='nav-header'>
        <div className='nav-bounds container'>
          <nav className='navbar'>
            <Logo />
            <form
              className='nav-search form-inline'
              onSubmit={this.onSubmitHandler}
            >
              <div className='search-box'>
                <input
                  onChange={this.onChangeHandler}
                  value={this.state.search}
                  type='text'
                  className='search-box-input'
                  placeholder='Never stop looking for products'
                />
                <button className='search-box-button search-box-addon' type='submit'>
                  <img src={SearchImg} alt='' />
                </button>
              </div>
            </form>
          </nav>
        </div>
      </div>
    );
  }
}

export default SearchBar;
