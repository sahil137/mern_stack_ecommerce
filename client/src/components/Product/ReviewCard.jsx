import React from 'react';
import ReactStars from 'react-rating-stars-component';
import userProfile from '../../assets/images/user_profile.svg';
const ReviewCard = (props) => {
  const { review } = props;
  const options = {
    edit: false,
    color: 'rgba(20, 20, 20, 0.1)',
    activeColor: 'tomato',
    value: review.rating,
    isHalf: true,
    size: 20,
  };
  return (
    <div className="reviewCard">
      <img src={userProfile} alt="Profile Avatar" />
      <p>{review.name}</p>
      <ReactStars {...options} />
    </div>
  );
};

export default ReviewCard;
