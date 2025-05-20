import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './cart.css';
import ProductCard from '../ProductCard';
import '../../app.css'
import paypal from "../../assets/paypal.png"
import visa from "../../assets/visa.png"
import TitleSection from '../TitleSection'
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

  // ✅ حساب مجموع السعر
  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const handleRemoveFromCart = async (cartItemId) => {
  try {
    await axios.delete(`http://localhost:5000/api/cart/${cartItemId}`, {
      withCredentials: true,
    });

    // تحديث الحالة لإزالة العنصر من الواجهة
    setCartItems((prevItems) => prevItems.filter(item => item._id !== cartItemId));
  } catch (error) {
    console.error('Error removing item from cart:', error.response?.data || error.message);
  }
};


  return (

    <>
           <TitleSection title={'Shopping Cart'} />

        <div className="py-4 container ">
      

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
                onRemove={() => handleRemoveFromCart(item._id)}               />
            ))}
          </div>

         {/* <div className="checkout-section payment-box mt-5 p-4 rounded shadow-sm">
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
</div> */}


<button
  className="btn btn-primary w-100 py-2 fs-5 mt-4"
  onClick={() => {
    // هنا تنتقل لصفحة الدفع
    // لو تستخدم React Router:
    navigate('/checkout');
  }}
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
