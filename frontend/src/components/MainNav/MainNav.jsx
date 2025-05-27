import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FiShoppingCart } from "react-icons/fi";
import axios from "axios";
import './MainNav.css';
import logo from '../../assets/logo4.png';

const MainNav = ({ isLoggedIn, setIsLoggedIn, role, setRole }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then(res => {
        const name = res.data.user.name || 'User';
        setUsername(name.split(' ')[0]);
        setRole(res.data.user.role);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUsername('');
        setRole('');
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:5000/api/auth/logout", { withCredentials: true });
      setIsLoggedIn(false);
      setUsername('');
      setRole('');
      navigate('/'); // بعد تسجيل الخروج ارجع للصفحة الرئيسية
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // إذا كان المستخدم أدمن أو سوبر أدمن، لا تظهر MainNav
  if (role === 'admins' || role === 'superadmin') {
    return null;
  }

  return (
    <nav className="main-nav">
      <Link to="/">
        <img src={logo} alt="Store Logo" className="logo" />
        <span className="store-name">Electronics Store</span>
      </Link>

      <ul className="nav-links">
        {(!role || role === 'user') && (
          <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/products">Products</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
            <li><NavLink to="/contact">Contact Us</NavLink></li>
          </>
        )}
      </ul>

      <div className="user-info">
        {isLoggedIn ? (
          <div className='loginUserInfowithLogout'>
            <div className='loginUserInfo'>
              <FaUser className="user-icon" />
              <span className='helloUser'>Hello, {username}</span>
              {role === 'user' && (
                <FiShoppingCart className="cart-icon" onClick={() => navigate('/cart')} />
              )}
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
