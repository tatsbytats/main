import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FundraiserCard = () => {
  const [raisedAmount, setRaisedAmount] = useState(4200);
  const goalAmount = 10000;

  const percentRaised = Math.min((raisedAmount / goalAmount) * 100, 100).toFixed(0);

  const recentDonors = [
    { name: 'Emily R.', amount: 100 },
    { name: 'James T.', amount: 50 },
    { name: 'Alex K.', amount: 25 },
  ];

  const handleDonate = () => {
    // Simulate donation
    const newAmount = raisedAmount + 100;
    setRaisedAmount(newAmount);
    alert('Thank you for your donation!');
  };

  return (
    <div className="card shadow-sm my-4">
      <div className="card-body">
        <h3 className="card-title">Help Us Save More Animals</h3>
        <p className="card-text">
          Your contribution helps provide food, shelter, and medical care to rescued animals.
        </p>

        <div className="mb-3">
          <div className="d-flex justify-content-between">
            <small>${raisedAmount.toLocaleString()} raised</small>
            <small>Goal: ${goalAmount.toLocaleString()}</small>
          </div>
          <div className="progress" style={{ height: '20px' }}>
            <div
              className="progress-bar progress-bar-striped bg-success"
              role="progressbar"
              style={{ width: `${percentRaised}%` }}
              aria-valuenow={percentRaised}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {percentRaised}%
            </div>
          </div>
        </div>

        <button className="btn btn-primary w-100" onClick={handleDonate}>
          Donate $100
        </button>

        <hr />

        <h6>Recent Donors</h6>
        <ul className="list-unstyled">
          {recentDonors.map((donor, index) => (
            <li key={index}>
              <strong>{donor.name}</strong> donated ${donor.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FundraiserCard;
