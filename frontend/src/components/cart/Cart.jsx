import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './cart.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import '../../app.css'

import TitleSection from '../../components/TitleSection/TitleSection'
import { useNavigate } from 'react-router-dom';

const Cart = ({ onRemove, onCheckout }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

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

  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${cartItemId}`, {
        withCredentials: true,
      });

      setCartItems((prevItems) => prevItems.filter(item => item._id !== cartItemId));
    } catch (error) {
      console.error('Error removing item from cart:', error.response?.data || error.message);
    }
  };

  const handleProceedToCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/order', {}, {
        withCredentials: true,
      });

      console.log('✅ Order created:', response.data);

      const orderId = response.data.order._id;  // جلب معرف الطلب من الرد
      navigate(`/checkout/${orderId}`);          // التنقل إلى صفحة الدفع مع المعرف

    } catch (error) {
      console.error('❌ Failed to create order:', error.response?.data || error.message);
      alert('Something went wrong while creating your order.');
    }
  };

  return (
    <>
      <TitleSection title={'Shopping Cart'} />

      <div className="py-4 container ">
        {cartItems.length === 0 ? (
          <p className="empty-cart ">Your cart is empty.</p>
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
                  onRemove={() => handleRemoveFromCart(item._id)}
                />
              ))}
            </div>

            <button
              className="btn btn-primary w-100 py-2 fs-5 mt-4"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
