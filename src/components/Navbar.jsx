import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top custom-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div className="brand-logo-icon">
            <i className="bi bi-bag-heart-fill"></i>
          </div>
          <span className="brand-text">E-Shop<span className="text-primary-accent">Hub</span></span>
        </Link>

        <button 
          className="navbar-toggler border-0 shadow-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent" 
          aria-controls="navbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list fs-2 text-white"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 gap-lg-1">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link custom-nav-link ${isActive ? 'active' : ''}`} to="/">
                <i className="bi bi-house-door me-1"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link custom-nav-link ${isActive ? 'active' : ''}`} to="/products">
                <i className="bi bi-grid me-1"></i> Products
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <Link to="/cart" className="btn custom-cart-btn position-relative d-flex align-items-center gap-2">
              <i className="bi bi-cart3 fs-5"></i>
              <span className="d-none d-md-inline fw-medium">Cart</span>
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger-accent shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="d-flex align-items-center gap-2">
                <Link to="/profile" className="btn custom-user-btn d-flex align-items-center gap-2">
                  <div className="user-avatar-small">
                    {currentUser?.fullName ? currentUser.fullName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="fw-medium d-none d-md-inline ms-1">{currentUser?.fullName}</span>
                </Link>
                <button onClick={handleLogout} className="btn custom-logout-btn" title="Logout">
                  <i className="bi bi-box-arrow-right"></i>
                  <span className="d-none d-sm-inline ms-1">Logout</span>
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link to="/login" className="btn custom-login-btn">
                  Login
                </Link>
                <Link to="/register" className="btn custom-register-btn">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
