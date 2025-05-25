import React from 'react';
import './ContactUs.css';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="contact-wrapper">
      <div className="contact-card glass">
        <h2 className="contact-title">Contact Us Anytime</h2>
        <p className="contact-subtitle">We’re here to help and answer any question you might have.</p>
        
        <div className="contact-content">
          <div className="contact-form">
            <form>
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
              <textarea placeholder="Your Message" rows="4" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>

          <div className="contact-info">
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <p>Email: support@shopApp.com</p>
            </div>
            <div className="info-item">
              <FaPhoneAlt className="info-icon" />
              <p>+973 1234 5678</p>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <p>Zarqa, Jordan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
