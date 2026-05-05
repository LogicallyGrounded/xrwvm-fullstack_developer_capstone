import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";

const Dealer = () => {
  const [dealer, setDealer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  let { id } = useParams();

  const get_dealer = async () => {
    const res = await fetch("/djangoapp/dealer/" + id);
    const retobj = await res.json();
    if (retobj.status === 200 && retobj.dealer.length > 0) {
      setDealer(retobj.dealer[0]);
    }
  };

  const get_reviews = async () => {
    const res = await fetch("/djangoapp/reviews/dealer/" + id);
    const retobj = await res.json();
    if (retobj.status === 200) {
      if (retobj.reviews.length > 0) {
        setReviews(retobj.reviews);
      } else {
        setUnreviewed(true);
      }
    }
  };

  useEffect(() => {
    get_dealer();
    get_reviews();
  }, [id]);

  return (
    <div className="dealer-container">
      {dealer && (
        <div className="dealer-header" style={{margin: "20px 0"}}>
          <h1>{dealer.full_name}</h1>
          <p>{dealer.city}, {dealer.address}, Zip - {dealer.zip}, {dealer.state}</p>
          {sessionStorage.getItem("username") && (
            <a href={`/postreview/${id}`} className="review-btn" style={{display: 'inline-block', marginTop: '10px'}}>Write a Review</a>
          )}
        </div>
      )}
      <div className="reviews-panel" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px 0' }}>
        {reviews.length === 0 && unreviewed === false ? (
          <p>Loading Reviews...</p>
        ) : unreviewed === true ? (
          <p>No reviews yet! Be the first to review this dealer.</p>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="review-card" style={{ border: '1px solid #ccc', padding: '15px', width: '300px', borderRadius: '10px', backgroundColor: 'white' }}>
              <div className="sentiment"><strong>Sentiment:</strong> {review.sentiment}</div>
              <h3 style={{margin: '10px 0'}}>{review.name}</h3>
              <h5 style={{color: 'gray'}}>{review.car_make} {review.car_model} ({review.car_year})</h5>
              <p>{review.review}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Dealer;
