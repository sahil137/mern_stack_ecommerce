import React, { useEffect, useState } from 'react';
import '../../assets/css/products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProducts } from '../../redux/actions/productAction';
import Loader from '../Layout/Loader/Loader';
import ProductCard from './ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const state = useSelector((state) => state.productReducer);
  const { products, loading, error, productCount, resultPerPage } = state;
  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNumber = (e) => {
    setCurrentPage(e);
  };
  useEffect(() => {
    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);

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
          {resultPerPage < productCount && (
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
