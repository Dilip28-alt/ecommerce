import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-page py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5">
            <div className="card border-0 shadow-lg rounded-5 overflow-hidden bg-white p-4 p-sm-5">
              <div className="text-center mb-4">
                <div className="auth-logo-icon mx-auto mb-3">
                  <i className="bi bi-person-lock fs-2 text-white"></i>
                </div>
                <h2 className="fw-extrabold text-dark">Welcome Back</h2>
                <p className="text-muted small">Sign in to your E-Shop Hub account to continue</p>
              </div>

              {error && (
                <div className="alert alert-danger alert-dismissible fade show rounded-4 py-2 px-3 small mb-4" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
                  <button type="button" className="btn-close py-2" onClick={() => setError(null)}></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
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

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label fw-semibold text-dark small mb-0">Password</label>
                  </div>
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

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-100 rounded-4 fw-bold shadow-md hover-scale mb-3"
                >
                  Sign In
                </button>
              </form>

              <div className="text-center pt-3 border-top">
                <p className="text-muted small mb-0">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary fw-bold text-decoration-none">
                    Register Now
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

export default Login;
