import React from 'react';
import './checkout.css';
import TitleSection from '../TitleSection';
import paypal from '../../assets/paypal.png'
import cridt from '../../assets/visa.png'
import cash from '../../assets/cash.png'

const Checkout = () => {
  const shippingInfo = {
    name: 'Oday Ahmed',
    email: 'oday@example.com',
    phone: '1234567890',
    address: '123 Main Street, Amman, Jordan',
    shippingMethod: 'Express',
  };

  const orderItems = [
    { name: 'iPhone 15', quantity: 1, unitPrice: 699 },
    { name: 'Samsung Monitor 27"', quantity: 2, unitPrice: 250 },
  ];

  const totalAmount = orderItems.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );

  return (
    <>
      <TitleSection title="🧾 Checkout Summary" />
      <div className="container checkout-page py-4 sm-shadow">

        {/* Shipping Info */}
        <div className="mb-4 simple-box">
          <h5>📦 Shipping</h5>
          <p><strong>Name:</strong> {shippingInfo.name}</p>
          <p><strong>Email:</strong> {shippingInfo.email}</p>
          <p><strong>Phone:</strong> {shippingInfo.phone}</p>
          <p><strong>Address:</strong> {shippingInfo.address}</p>
          <p><strong>Method:</strong> {shippingInfo.shippingMethod}</p>
        </div>

        {/* Order Items */}
        <div className="mb-4 simple-box">
          <h5>🛍️ Order Items</h5>
          {orderItems.map((item, index) => (
            <div className="d-flex justify-content-between mb-2" key={index}>
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between mt-2">
            <strong>Total:</strong>
            <strong>${totalAmount.toFixed(2)}</strong>
          </div>
        </div>

        {/* Payment Method */}
<div className="mb-4 simple-box">
  <h5>💳 Payment Method</h5>

  <div className="form-check d-flex align-items-center mb-2">
    <input className="form-check-input me-2" type="radio" name="paymentMethod" id="creditCard" defaultChecked />
    <label className="form-check-label d-flex align-items-center" htmlFor="creditCard">
      <img src={cridt} alt="Credit Card" width="28" className="me-2" />
      Credit / Debit Card
    </label>
  </div>

  <div className="form-check d-flex align-items-center mb-2">
    <input className="form-check-input me-2" type="radio" name="paymentMethod" id="paypal" />
    <label className="form-check-label d-flex align-items-center" htmlFor="paypal">
      <img src={paypal} alt="PayPal" width="28" className="me-2" />
      PayPal
    </label>
  </div>

  <div className="form-check d-flex align-items-center">
    <input className="form-check-input me-2" type="radio" name="paymentMethod" id="cod" />
    <label className="form-check-label d-flex align-items-center" htmlFor="cod">
      <img src={cash} alt="Cash on Delivery" width="28" className="me-2" />
      Cash on Delivery
    </label>
  </div>
</div>


        {/* Confirm Button */}
        <div className="text-end">
          <button className="btn confirm-btn-simple px-4 py-2">
            ✅ Confirm Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
