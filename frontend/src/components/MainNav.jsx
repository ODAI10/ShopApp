import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FiShoppingCart } from "react-icons/fi";
import axios from "axios";
import './MainNav.css';
import logo from '../assets/logo4.png';

const MainNav = () => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then(res => {
        const name = res.data.user.name || 'User';
        console.log(res.data.user.name)
        setUsername(name.split(' ')[0]);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUsername('');
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:5000/api/auth/logout", { withCredentials: true });
      setIsLoggedIn(false);
      setUsername('');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <nav className="main-nav">
      <Link to="/">
        <img src={logo} alt="Store Logo" className="logo" />
        <span className="store-name">Electronics Store</span>
      </Link>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/wishlist">Wishlist</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>

      <div className="user-info">
        {isLoggedIn ? (
          <div className='loginUserInfowithLogout'>
            <div className='loginUserInfo'>
              <FaUser className="user-icon" />
              <span className='helloUser' onClick={goToProfile}>Hello, {username}</span>
              <span>
                <FiShoppingCart className="cart-icon" onClick={goToCart} />
              </span>
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
