// components/AboutUs/AboutUs.js
import React from 'react';
import './AboutUs.css';
import { FaShippingFast, FaLaptop, FaHeadset, FaThumbsUp } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="about-container ">
      <section className="about-hero ">
        <h1>About Us</h1>
        <p>Your trusted source for quality electronics</p>
      </section>

      <section className="about-grid container">
        <div className="about-card">
          <FaLaptop className="about-icon" />
          <h3>High-Quality Products</h3>
          <p>We offer top-notch electronics from trusted brands to meet your needs.</p>
        </div>

        <div className="about-card">
          <FaShippingFast className="about-icon" />
          <h3>Fast Delivery</h3>
          <p>Get your orders delivered quickly and safely to your doorstep.</p>
        </div>

        <div className="about-card">
          <FaHeadset className="about-icon" />
          <h3>24/7 Support</h3>
          <p>Our support team is always here to help you with any questions.</p>
        </div>

        <div className="about-card">
          <FaThumbsUp className="about-icon" />
          <h3>Trusted by Customers</h3>
          <p>We’ve earned the trust of thousands of happy customers worldwide.</p>
        </div>
      </section>

      <section className="about-story">
        <h2>Our Story</h2>
        <p>
          Founded in 2024, we are dedicated to making cutting-edge electronics available for everyone. We started as a small shop and grew into an online destination for the latest devices.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
