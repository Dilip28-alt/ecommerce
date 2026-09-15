import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/Profile.css';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-page py-5 bg-light min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg rounded-5 overflow-hidden bg-white mb-4">
              {/* Cover Banner */}
              <div className="profile-cover p-5 text-center text-white position-relative">
                <div className="position-relative z-2">
                  <div className="profile-avatar mx-auto mb-3 shadow-lg">
                    {currentUser?.fullName ? currentUser.fullName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <h2 className="fw-extrabold mb-1">{currentUser?.fullName}</h2>
                  <p className="text-slate-300 mb-0">{currentUser?.email}</p>
                </div>
              </div>

              {/* Profile Details */}
              <div className="card-body p-4 p-md-5">
                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded-4 border">
                      <div className="d-flex align-items-center gap-3">
                        <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-3 p-2 fs-4">
                          <i className="bi bi-person-badge"></i>
                        </div>
                        <div>
                          <small className="text-muted d-block">Full Name</small>
                          <strong className="text-dark fs-6">{currentUser?.fullName}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded-4 border">
                      <div className="d-flex align-items-center gap-3">
                        <div className="icon-box bg-success bg-opacity-10 text-success rounded-3 p-2 fs-4">
                          <i className="bi bi-envelope-at"></i>
                        </div>
                        <div>
                          <small className="text-muted d-block">Email Address</small>
                          <strong className="text-dark fs-6">{currentUser?.email}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded-4 border">
                      <div className="d-flex align-items-center gap-3">
                        <div className="icon-box bg-warning bg-opacity-10 text-warning rounded-3 p-2 fs-4">
                          <i className="bi bi-shield-check"></i>
                        </div>
                        <div>
                          <small className="text-muted d-block">Account Status</small>
                          <strong className="text-success fs-6">Active & Verified</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded-4 border">
                      <div className="d-flex align-items-center gap-3">
                        <div className="icon-box bg-purple bg-opacity-10 text-purple rounded-3 p-2 fs-4">
                          <i className="bi bi-cart3"></i>
                        </div>
                        <div>
                          <small className="text-muted d-block">Cart Items</small>
                          <strong className="text-dark fs-6">{totalItems} Items</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center pt-4 border-top gap-3">
                  <div className="d-flex gap-2">
                    <Link to="/cart" className="btn btn-outline-primary rounded-pill px-4 fw-semibold">
                      <i className="bi bi-cart me-1"></i> View Cart
                    </Link>
                    <Link to="/products" className="btn btn-outline-secondary rounded-pill px-4 fw-semibold">
                      <i className="bi bi-shop me-1"></i> Browse Products
                    </Link>
                  </div>

                  <button 
                    onClick={handleLogout}
                    className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center gap-2"
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
