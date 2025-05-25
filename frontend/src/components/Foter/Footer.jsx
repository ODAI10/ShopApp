import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../assets/logo4.png';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src={logo} alt="Store Logo" />
            <span>Electronics Store</span>
          </Link>
          <p className="footer-description">
            Your trusted store for the latest electronic devices and accessories.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: support@shopApp.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Location: Amman, Jordan</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Electronics Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
