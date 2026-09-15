import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4 mt-auto border-top border-secondary">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold text-white mb-3 d-flex align-items-center gap-2">
              <i className="bi bi-bag-heart-fill text-primary"></i> E-Shop Hub
            </h5>
            <p className="text-secondary small pe-lg-4">
              Your one-stop destination for premium electronics, fashion, home essentials, and lifestyle products. Quality guaranteed with instant LocalStorage sync.
            </p>
            <div className="d-flex gap-3 fs-5 text-secondary">
              <a href="#" className="text-secondary hover-white"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-secondary hover-white"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-secondary hover-white"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="text-secondary hover-white"><i className="bi bi-github"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-white mb-3">Quick Links</h6>
            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2">
              <li><Link to="/" className="text-decoration-none text-secondary">Home</Link></li>
              <li><Link to="/products" className="text-decoration-none text-secondary">All Products</Link></li>
              <li><Link to="/cart" className="text-decoration-none text-secondary">Shopping Cart</Link></li>
              <li><Link to="/profile" className="text-decoration-none text-secondary">My Profile</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-white mb-3">Product Categories</h6>
            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2">
              <li><Link to="/products?category=Electronics" className="text-decoration-none text-secondary">Electronics</Link></li>
              <li><Link to="/products?category=Clothing" className="text-decoration-none text-secondary">Clothing & Apparel</Link></li>
              <li><Link to="/products?category=Shoes" className="text-decoration-none text-secondary">Footwear</Link></li>
              <li><Link to="/products?category=Accessories" className="text-decoration-none text-secondary">Accessories</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-white mb-3">Customer Support</h6>
            <p className="text-secondary small mb-2"><i className="bi bi-geo-alt me-2 text-primary"></i> 100 Tech Park Way, Innovation City</p>
            <p className="text-secondary small mb-2"><i className="bi bi-envelope me-2 text-primary"></i> support@eshophub.com</p>
            <p className="text-secondary small mb-0"><i className="bi bi-telephone me-2 text-primary"></i> +91 1800-123-4567</p>
          </div>
        </div>

        <hr className="my-4 border-secondary" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-secondary small">
          <p className="mb-2 mb-md-0">&copy; {new Date().getFullYear()} E-Shop Hub. Built for Final Year Project Demonstration.</p>
          <div className="d-flex gap-3">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
