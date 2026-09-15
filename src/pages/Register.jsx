import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Register.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Validation 1: Required fields
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    // Validation 2: Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validation 3: Password match
    if (password !== confirmPassword) {
      setError('Password and Confirm Password do not match.');
      return;
    }

    // Validation 4: Password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const result = register(fullName.trim(), email.trim(), password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="register-page py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5">
            <div className="card border-0 shadow-lg rounded-5 overflow-hidden bg-white p-4 p-sm-5">
              <div className="text-center mb-4">
                <div className="auth-logo-icon mx-auto mb-3">
                  <i className="bi bi-person-plus-fill fs-2 text-white"></i>
                </div>
                <h2 className="fw-extrabold text-dark">Create Account</h2>
                <p className="text-muted small">Join E-Shop Hub to start shopping with full feature access</p>
              </div>

              {error && (
                <div className="alert alert-danger alert-dismissible fade show rounded-4 py-2 px-3 small mb-4" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
                  <button type="button" className="btn-close py-2" onClick={() => setError(null)}></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark small">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 text-muted">
                      <i className="bi bi-person"></i>
                    </span>
                    <input 
                      type="text" 
                      className="form-control bg-light border-start-0 py-2 fs-6" 
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark small">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 text-muted">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input 
                      type="email" 
                      className="form-control bg-light border-start-0 py-2 fs-6" 
                      placeholder="user@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark small">Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 text-muted">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input 
                      type="password" 
                      className="form-control bg-light border-start-0 py-2 fs-6" 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark small">Confirm Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 text-muted">
                      <i className="bi bi-shield-check"></i>
                    </span>
                    <input 
                      type="password" 
                      className="form-control bg-light border-start-0 py-2 fs-6" 
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-100 rounded-4 fw-bold shadow-md hover-scale mb-3"
                >
                  Register
                </button>
              </form>

              <div className="text-center pt-3 border-top">
                <p className="text-muted small mb-0">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary fw-bold text-decoration-none">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
