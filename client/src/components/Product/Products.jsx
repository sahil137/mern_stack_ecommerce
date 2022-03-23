import React, { useEffect } from 'react';
import '../../assets/css/products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProducts } from '../../redux/actions/productAction';
import Loader from '../Layout/Loader/Loader';
import ProductCard from './ProductCard';
import { useParams } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const state = useSelector((state) => state.productReducer);
  const { products, loading, error, productCount } = state;

  useEffect(() => {
    dispatch(getProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
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

export default Products;
