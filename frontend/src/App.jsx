import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import Home from './components/home/Home';
import Login from './Auth/Login';
import Register from './Auth/Register';
import MainNav from './components/MainNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from './components/products/products'
import Cart from './components/cart/Cart'
import Checkout from './components/Checkout/Checkout'
import axios from 'axios';
function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);

  // التحقق من وجود التوكن في الكوكيز عند تحميل الصفحة
    useEffect(() => {
    axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then(res => {
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <>
    <MainNav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path='/products' element={<Products/>} />
        <Route path='/Cart' element={<Cart/>} />
        <Route path='/Checkout' element={<Checkout/>} />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
