import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './cart.css';
import ProductCard from '../ProductCard';
import '../../app.css'
import paypal from "../../assets/Paypal.png"
import visa from "../../assets/visa.png"

const Cart = ({ onRemove, onCheckout }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const me = await axios.get('http://localhost:5000/api/auth/me', { withCredentials: true });
        console.log('User info:', me.data);

        const response = await axios.get('http://localhost:5000/api/cart', {
          withCredentials: true,
        });
        console.log('Cart items:', response.data);
        setCartItems(response.data);
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
      }
    };

    fetchCartItems();
  }, []);

  // ✅ حساب مجموع السعر
  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="py-4 container">
      <h2 className="cart-title mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="products-container">
            {cartItems.map((item) => (
              <ProductCard
                key={item._id}
                product={item.product}
                quantity={item.quantity}
                showDescription={false}
                showQuantity={true}
                showMore={false}
                showAddToCart={false}
                showRemoveButton={true}
                onRemove={() => onRemove(item._id)}
              />
            ))}
          </div>

         <div className="checkout-section payment-box mt-5 p-4 rounded shadow-sm">
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h5 className="mb-0">Total Amount:</h5>
    <h4 className="text-success">${totalPrice.toFixed(2)}</h4>
  </div>
  <div className="payment-methods d-flex gap-3 mb-3">
    <img src={visa} alt="Visa" className="payment-icon" />
    <img src={paypal} alt="PayPal" className="payment-icon" />
  </div>
  <button className="btn btn-success w-100 py-2 fs-5" onClick={onCheckout}>
    🛒 Complete Payment
  </button>
</div>

        </>
      )}
    </div>
  );
};

export default Cart;
