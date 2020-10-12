import React from 'react';

import SearchBar from '../../components/SearchBar/SearchBar';
import './Home.css';

const Home = (props) => {
  return (
    <div>
      <SearchBar history={props.history} />
      <h1 className='hidden-title'>Home Page - Test</h1>
      <div className='home'>
        <p className='home-message'>
          Millones de publicaciones para descubrir.
        </p>
      </div>
    </div>
  );
};

export default Home;
