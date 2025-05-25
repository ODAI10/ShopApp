import React, { useEffect, useState } from 'react';
import {Link , NavLink, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FiShoppingCart } from "react-icons/fi";
import axios from "axios";
import './MainNav.css';
import logo from '../../assets/logo4.png';

const MainNav = ({ isLoggedIn, setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
        .then(res => {
          const name = res.data.user.name || 'User';
          setUsername(name.split(' ')[0]);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setUsername('');
        });
    }
  }, [isLoggedIn, setIsLoggedIn]);

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:5000/api/auth/logout", { withCredentials: true });
      setIsLoggedIn(false);
      setUsername('');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="main-nav">
      <Link to="/">
        <img src={logo} alt="Store Logo" className="logo" />
        <span className="store-name">Electronics Store</span>
      </Link>

      <ul className="nav-links">
        <li><NavLink  to="/">Home</NavLink></li>
        <li><NavLink  to="/products">Products</NavLink></li>
        <li><NavLink  to="/about">About Us</NavLink></li>
        <li><NavLink  to="/contact">Contact Us</NavLink></li>
      </ul>

      <div className="user-info">
        {isLoggedIn ? (
          <div className='loginUserInfowithLogout'>
            <div className='loginUserInfo'>
              <FaUser className="user-icon" />
              <span className='helloUser' onClick={() => navigate('#')}>Hello, {username}</span>
              <FiShoppingCart className="cart-icon" onClick={() => navigate('/cart')} />
            </div>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login" className="login-link">
              <button className="auth-btn">Login</button>
            </Link>
            <Link to="/register" className="register-link">
              <button className="auth-btn">Register</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
