import React from 'react';
import { CgMouse } from 'react-icons/cg';

import '../../../assets/css/home.css';

const Home = () => {
  return (
    <>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>Have a look at our amazing products</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="home-heading">Featured Products</h2>
    </>
  );
};

export default Home;
