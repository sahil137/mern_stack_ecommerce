import React, { useEffect, useState } from 'react';
import '../../assets/css/products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProducts } from '../../redux/actions/productAction';
import Loader from '../Layout/Loader/Loader';
import ProductCard from './ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Typography, Slider } from '@mui/material';
import { useAlert } from 'react-alert';
import MetaData from '../Layout/MetaData';
const categories = [
  'Laptop',
  'Footwear',
  'Electronics',
  'SmartPhones',
  'Camera',
  'Accessories',
];

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { keyword } = useParams();
  const state = useSelector((state) => state.productReducer);
  const {
    products,
    loading,
    error,
    productCount,
    resultPerPage,
    filteredProductsCount,
  } = state;
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const setCurrentPageNumber = (e) => {
    setCurrentPage(e);
  };

  const ratingHandler = (event, newRating) => {
    setRating(newRating);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, keyword, currentPage, price, category, rating, alert, error]);

  let count = filteredProductsCount;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={'Products Blinkart'} />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="rangle-slider"
              min={0}
              max={25000}
            />
            <Typography>Categories</Typography>

            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings</Typography>
              <Slider
                min={0}
                max={5}
                aria-labelledby="continuous-slider"
                value={rating}
                onChange={ratingHandler}
                valueLabelDisplay="auto"
              />
            </fieldset>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNumber}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
