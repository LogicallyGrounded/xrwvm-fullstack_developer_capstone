import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import Header from '../Header/Header'; // 1. Make sure this import is here

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [states, setStates] = useState([]);

  const get_dealers = async () => {
    try {
      const res = await fetch("/djangoapp/get_dealers");
      const retobj = await res.json();
      if(retobj.status === 200) {
        let all_dealers = retobj.dealers;
        let statesList = all_dealers.map(dealer => dealer.state);
        setStates(Array.from(new Set(statesList)));
        setDealersList(all_dealers);
      }
    } catch (e) {
      console.error("Waiting for backend...");
    }
  };

  useEffect(() => { get_dealers(); }, []);  

  return(
    <div>
      <Header/> {/* 2. YOU MUST ADD THIS HERE */}
      <div className="dealer-container">
        <div className="dealer-header">Dealerships</div>
        <table className='dealer-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Dealer Name</th>
              <th>City</th>
              <th>Address</th>
              <th>Zip</th>
              <th>
                <select name="state" id="state" onChange={(e) => get_dealers(e.target.value)}>
                  <option value="" selected disabled hidden>State</option>
                  <option value="All">All States</option>
                  {states.map(state => (<option key={state} value={state}>{state}</option>))}
                </select>
              </th>
              {sessionStorage.getItem("username") && (<th>Review Dealer</th>)}
            </tr>
          </thead>
          <tbody>
            {dealersList.map(dealer => (
              <tr key={dealer.id}>
                <td>{dealer.id}</td>
                <td><a href={'/dealer/' + dealer.id}>{dealer.full_name}</a></td>
                <td>{dealer.city}</td>
                <td>{dealer.address}</td>
                <td>{dealer.zip}</td>
                <td>{dealer.state}</td>
                {sessionStorage.getItem("username") && (
                  <td><a href={'/postreview/' + dealer.id} className="review-btn">Review</a></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Dealers;