import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  clearErrors,
  getProductDetails,
  newProductReview,
} from '../../redux/actions/productAction';
import Carousel from 'react-material-ui-carousel';
import ReactStars from 'react-rating-stars-component';
import '../../assets/css/product_details.css';
import Loader from '../Layout/Loader/Loader';
import ReviewCard from './ReviewCard';
import { useAlert } from 'react-alert';
import MetaData from '../Layout/MetaData';
import { addItemsToCart } from '../../redux/actions/cartAction';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const state = useSelector((state) => state.productDetailsReducer);

  const { success, error: reviewError } = useSelector(
    (state) => state.newReviewReducer
  );

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { product, loading, error } = state;

  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      alert.info('Max Quantity reached');
      return;
    }
    let qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity === 1) {
      return;
    }
    let qty = quantity - 1;
    setQuantity(qty);
  };

  const options = {
    edit: false,
    color: 'rgba(20, 20, 20, 0.1)',
    activeColor: 'tomato',
    value: product.rating,
    isHalf: true,
    size: 20,
  };

  const handleAddToCart = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success('Item Added to cart successfully');
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const submitReviewHandler = () => {
    const myForm = new FormData();

    myForm.set('rating', rating);
    myForm.set('comment', comment);
    myForm.set('productId', id);

    dispatch(newProductReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Review Submitted Successfully');
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, alert, error, reviewError, success]);

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
                    <button onClick={decreaseQuantity}>-</button>
                    <input value={quantity} type="number" readOnly />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={handleAddToCart}>Add to Cart</button>
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
              <button onClick={submitReviewToggle} className="submit-review">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">Reviews</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Rating</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                size="large"
                onChange={(e) => setRating(e.target.value)}
                value={rating}
              />
              <textarea
                cols="30"
                rows="5"
                className="submitDialogTextArea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle}>Cancel</Button>
              <Button color="secondary" onClick={submitReviewHandler}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review, idx) => (
                  <ReviewCard key={idx} review={review} />
                ))}
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
