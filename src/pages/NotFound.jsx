import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container py-5 text-center min-vh-75 d-flex flex-column justify-content-center align-items-center">
      <div className="display-1 fw-extrabold text-primary mb-2">404</div>
      <h2 className="fw-bold text-dark mb-3">Page Not Found</h2>
      <p className="text-muted mb-4 max-w-600">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary btn-lg rounded-pill px-4 fw-bold">
        <i className="bi bi-house-door me-2"></i> Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
