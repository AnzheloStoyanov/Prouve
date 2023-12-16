import React, { useState } from 'react';
import './YourStylesheet.css'; // Add your custom styles if needed
import 'akar-icons-fonts';

const CheckoutForm = () => {
  const [cvcVisible, setCvcVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  const handleCardNumberChange = (e) => {
    const formattedCardNumber = e.target.value
      .replace(/\s/g, '')
      .match(/.{1,4}/g)
      ?.join(' ');

    setCardNumber(formattedCardNumber || '');
  };

  const handleCvcToggle = () => {
    setCvcVisible(!cvcVisible);
  };

  return (
    <div className="main-back">
      <div className="container m-auto bg-white p-5 bod-3">
        <div className="row">
          {/* CARD FORM */}
          <div className="col-lg-8 col-md-12">
            <form>
              <div className="header flex-between flex-vertical-center">
                <div className="flex-vertical-center">
                  <i className="ai-bitcoin-fill size-xl pr-sm f-main-color"></i>
                  <span className="title">
                    <strong>AceCoin</strong>
                    <span>Pay</span>
                  </span>
                </div>
              </div>
              <div className="card-data flex-fill flex-vertical">
                {/* Card Number */}
                <div className="flex-between flex-vertical-center">
                  <div className="card-property-title">
                    <strong>Card Number</strong>
                    <span>Enter 16-digit card number on the card</span>
                  </div>
                </div>

                {/* Card Field */}
                <div className="flex-between">
                  <div className="card-number flex-vertical-center flex-fill">
                    <div className="card-number-field flex-vertical-center flex-fill">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="24px"
                        height="24px"
                      >
                        {/* ... (path elements) */}
                      </svg>
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="form-control"
                        id="cardNumber"
                        maxLength="19"
                        name="cardNumber"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        required
                      />
                    </div>
                    <i className="ai-circle-check-fill size-lg f-main-color"></i>
                  </div>
                </div>

                {/* Expiry Date */}
                <div className="flex-between">
                  <div className="card-property-title">
                    <strong>Expiry Date</strong>
                    <span>Enter the expiration date of the card</span>
                  </div>
                  <div className="card-property-value flex-vertical-center">
                    <div className="input-container half-width">
                      <input
                        className="numbers month-own"
                        type="text"
                        placeholder="MM"
                        maxLength="2"
                        value={expiryMonth}
                        onChange={(e) => setExpiryMonth(e.target.value)}
                      />
                    </div>
                    <span className="m-md">/</span>
                    <div className="input-container half-width">
                      <input
                        className="numbers year-own"
                        type="text"
                        placeholder="YYYY"
                        maxLength="4"
                        value={expiryYear}
                        onChange={(e) => setExpiryYear(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* CCV Number */}
                <div className="flex-between">
                  {/* ... (other elements) */}
                </div>

                {/* Name */}
                <div className="flex-between">
                  {/* ... (other elements) */}
                </div>

                <div className="flex-between">
                  {/* ... (other elements) */}
                </div>
              </div>
              <div className="action flex-center">
                <button type="submit" className="b-main-color pointer">
                  Pay Now
                </button>
              </div>
            </form>
          </div>

          {/* SIDEBAR */}
          <div className="col-lg-4 col-md-12 py-5">
            {/* ... (other elements) */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
