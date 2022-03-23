import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  clearErrors,
  getProductDetails,
} from '../../redux/actions/productAction';
import Carousel from 'react-material-ui-carousel';
import ReactStars from 'react-rating-stars-component';
import '../../assets/css/product_details.css';
import Loader from '../Layout/Loader/Loader';
import ReviewCard from './ReviewCard';
import { useAlert } from 'react-alert';
import MetaData from '../Layout/MetaData';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const state = useSelector((state) => state.productDetailsReducer);

  const { product, loading, error } = state;

  // console.log(product);

  const options = {
    edit: false,
    color: 'rgba(20, 20, 20, 0.1)',
    activeColor: 'tomato',
    value: product.rating,
    isHalf: true,
    size: 20,
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, alert, error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} Blinkart`} />
          <div className=" productDetails">
            <div>
              <Carousel className="carousel">
                {product.images &&
                  product.images.map((item, idx) => (
                    <img
                      className="carousel-image"
                      src={item.url}
                      key={item.url}
                      alt={`Slide ${idx + 1}`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product#{product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h2>{`₹${product.price}`}</h2>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input type="number" value="1" />
                    <button>+</button>
                  </div>
                  <button>Add to Cart</button>
                </div>
                <p>Status</p>
                <strong
                  className={product.stock < 1 ? 'redColor' : 'greenColor'}
                >
                  {product.stock < 1 ? 'Out Of Stock' : 'In Stock'}
                </strong>
              </div>
              <div className="detailsBlock-4">
                Description:
                <p>{product.description}</p>
              </div>
              <button className="submit-review">Submit Review</button>
            </div>
          </div>
          <h3 className="reviewsHeading">Reviews</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
