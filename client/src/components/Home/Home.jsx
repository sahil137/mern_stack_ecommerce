import React, { useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import '../../assets/css/home.css';
import ProductCard from '../Product/ProductCard';
import MetaData from '../Layout/MetaData';
import { useSelector, useDispatch } from 'react-redux';

import { clearErrors, getProducts } from '../../redux/actions/productAction';
import Loader from '../Layout/Loader/Loader';

import { useAlert } from 'react-alert';

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const state = useSelector((state) => state.productReducer);

  const { products, loading, error } = state;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Blinkart" />
          <div className="banner">
            <p>Welcome to Blinkart</p>
            <h1>Have a look at our products</h1>
            <a href="#container">
              <button>
                Take me there <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="home-heading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
