import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";

const PostReview = () => {
  const [dealer, setDealer] = useState(null);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [carmodel, setCarmodel] = useState("");
  const [cars, setCars] = useState([]);
  let { id } = useParams();

  const get_dealer = async () => {
    const res = await fetch("/djangoapp/dealer/" + id);
    const retobj = await res.json();
    if (retobj.status === 200 && retobj.dealer.length > 0) {
      setDealer(retobj.dealer[0]);
    }
  };

  const get_cars = async () => {
    const res = await fetch("/djangoapp/get_cars");
    const retobj = await res.json();
    setCars(retobj.CarModels || []);
  };

  useEffect(() => {
    get_dealer();
    get_cars();
  }, [id]);

  const postreview = async (e) => {
    e.preventDefault();
    const [make, model] = carmodel.split(" ");
    let json_body = {
      "name": name,
      "dealership": id,
      "review": review,
      "purchase": true,
      "purchase_date": date,
      "car_make": make,
      "car_model": model,
      "car_year": date.split("-")[0] || "2023"
    };

    const res = await fetch("/djangoapp/add_review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json_body)
    });
    const retobj = await res.json();
    if (retobj.status === 200) {
      window.location.href = "/dealer/" + id;
    } else {
      alert("Error posting review");
    }
  };

  return (
    <div style={{ margin: '50px' }}>
      <h2>{dealer ? `Write a review for ${dealer.full_name}` : "Loading..."}</h2>
      <form onSubmit={postreview} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required style={{padding: '10px'}}/>
        <textarea placeholder="Write your review here..." value={review} onChange={(e) => setReview(e.target.value)} required rows="5" style={{padding: '10px'}}></textarea>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={{padding: '10px'}}/>
        <select value={carmodel} onChange={(e) => setCarmodel(e.target.value)} required style={{padding: '10px'}}>
          <option value="" disabled hidden>Choose Car Make and Model</option>
          {cars.map((car, index) => (
            <option key={index} value={`${car.CarMake} ${car.CarModel}`}>{car.CarMake} {car.CarModel}</option>
          ))}
        </select>
        <button type="submit" className="review-btn" style={{ padding: '12px', backgroundColor: '#70cacd', border: 'none', cursor: 'pointer', color: 'white', fontWeight: 'bold' }}>Post Review</button>
      </form>
    </div>
  );
};
export default PostReview;
