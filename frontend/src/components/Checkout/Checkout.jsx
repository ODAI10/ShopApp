import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './checkout.css';
import paypal from '../../assets/paypal.png';
import cridt from '../../assets/visa.png';
import cash from '../../assets/cash.png';
import { useNavigate, useParams } from 'react-router-dom';

const Checkout = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { orderId } = useParams();  // جلب orderId من رابط الصفحة

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // نستخدم orderId من الرابط لجلب طلب معين
        const orderRes = await axios.get(`http://localhost:5000/api/order/${orderId}`, {
          withCredentials: true,
        });
        setOrder(orderRes.data.order || orderRes.data);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) {
          navigate('/login');
        } else {
          setError(`Failed to load order: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  if (loading) return <p className="loading-text">Loading order...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!order) return <p className="error-text">No order found.</p>;

  const shippingInfo = {
    name: order.user?.name || 'N/A',
    email: order.user?.email || 'N/A',
    phone: order.user?.phone || 'N/A',
    shippingMethod: order.shippingMethod,
  };

  const orderItems = Array.isArray(order.items) ? order.items.map(item => ({
    name: item.product?.name || 'Unknown Product',
    quantity: item.quantity,
    unitPrice: item.unitPrice,
  })) : [];

  const totalAmount = order.totalAmount ?? 0;

  const handleConfirmOrder = async () => {
    try {
      if (!order || !order._id) {
        alert('Order not found!');
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/api/order/${order._id}/confirm`,
        {},
        { withCredentials: true }
      );
      alert('✅ Order confirmed!');
      navigate('/');
    } catch (error) {
      console.error('Order confirmation error:', error);

      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        alert(`❌ Failed to confirm order: ${error.response.data.message || error.message}`);
      } else {
        alert(`❌ Failed to confirm order: ${error.message}`);
      }
    }
  };

  return (
    <div className="container checkout-page py-5">
      <h2 className="page-title mb-4">Order Summary</h2>

      <section className="section-box shipping-section mb-5">
        <h3>📦 Shipping Information</h3>
        <div className="info-row"><span>Name:</span> {shippingInfo.name}</div>
        <div className="info-row"><span>Email:</span> {shippingInfo.email}</div>
        <div className="info-row"><span>Phone:</span> {shippingInfo.phone}</div>
        <div className="info-row"><span>Order Date::</span> {new Date(order.orderDate).toLocaleString()}</div>
      </section>

      <section className="section-box items-section mb-5">
        <h3>🛍️ Order Items</h3>
        <table className="table items-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${(item.unitPrice * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-row">
          <strong>Total:</strong> <span>${totalAmount.toFixed(2)}</span>
        </div>
      </section>

      <section className="section-box payment-section mb-5">
        <h3>💳 Payment Method</h3>

        <label className="payment-option">
          <input type="radio" name="paymentMethod" defaultChecked />
          <img src={cridt} alt="Credit Card" />
          Credit / Debit Card
        </label>

        <label className="payment-option">
          <input type="radio" name="paymentMethod" />
          <img src={paypal} alt="PayPal" />
          PayPal
        </label>

        <label className="payment-option">
          <input type="radio" name="paymentMethod" />
          <img src={cash} alt="Cash on Delivery" />
          Cash on Delivery
        </label>
      </section>

      <div className="text-center">
        <button className="btn confirm-btn" onClick={handleConfirmOrder}>✅ Confirm Order</button>
      </div>
    </div>
  );
};

export default Checkout;
