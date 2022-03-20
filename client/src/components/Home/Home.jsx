import React, { useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import '../../assets/css/home.css';
import Product from './Product';
import MetaData from '../Layout/MetaData';
import { useSelector, useDispatch } from 'react-redux';

import { getProducts } from '../../redux/actions/productAction';

const Home = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.productReducer);

  const { products } = state;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <>
      <MetaData title="Blinkart" />
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
      <div className="container" id="container">
        {products &&
          products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Home;
