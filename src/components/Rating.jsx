import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addProductRating, getCalculatedProductRating } from '../utils/localStorage';

const Rating = ({ product, onRatingSubmit, interactive = false }) => {
  const { currentUser, isAuthenticated } = useAuth();
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [message, setMessage] = useState(null);

  // Get current merged rating from LocalStorage / props
  const ratingData = getCalculatedProductRating(product);

  const handleStarClick = (ratingVal) => {
    if (!interactive) return;

    if (!isAuthenticated) {
      setMessage({ type: 'danger', text: 'Please log in to rate this product.' });
      return;
    }

    setSelectedRating(ratingVal);
    // Add to LocalStorage
    addProductRating(product.id, currentUser.email, ratingVal);
    setMessage({ type: 'success', text: `Thank you! You rated this ${ratingVal} star${ratingVal > 1 ? 's' : ''}.` });

    if (onRatingSubmit) {
      onRatingSubmit();
    }
  };

  const currentDisplayRating = hoverRating || selectedRating || Math.round(ratingData.average);

  return (
    <div className="d-flex flex-column gap-1">
      <div className="d-flex align-items-center gap-2">
        <div className="d-flex gap-1 fs-6 text-warning">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = interactive 
              ? star <= (hoverRating || selectedRating || Math.floor(ratingData.average))
              : star <= Math.floor(ratingData.average);
            const isHalf = !interactive && !isFilled && (star - 0.5 <= ratingData.average);

            return (
              <i
                key={star}
                className={`bi ${
                  isFilled 
                    ? 'bi-star-fill' 
                    : isHalf 
                    ? 'bi-star-half' 
                    : 'bi-star'
                } ${interactive ? 'cursor-pointer' : ''}`}
                style={{ cursor: interactive ? 'pointer' : 'default', transition: 'transform 0.15s ease' }}
                onMouseEnter={() => interactive && setHoverRating(star)}
                onMouseLeave={() => interactive && setHoverRating(0)}
                onClick={() => handleStarClick(star)}
              ></i>
            );
          })}
        </div>

        <span className="fw-bold text-dark fs-7">
          {ratingData.average}
        </span>
        <span className="text-muted small">
          ({ratingData.count} rating{ratingData.count !== 1 ? 's' : ''})
        </span>
      </div>

      {message && (
        <div className={`alert alert-${message.type} py-1 px-2 small mt-1 mb-0`} role="alert">
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Rating;
