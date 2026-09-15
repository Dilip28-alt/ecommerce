import React from 'react';
import { Link } from 'react-router-dom';
import { initialProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';

const Home = () => {
  // Grab 6 featured products
  const featuredProducts = initialProducts.slice(0, 6);

  const categories = [
    { name: "Electronics", icon: "bi-laptop", bg: "gradient-blue", count: "4 Items" },
    { name: "Clothing", icon: "bi-gender-ambiguous", bg: "gradient-purple", count: "3 Items" },
    { name: "Shoes", icon: "bi-aspect-ratio", bg: "gradient-emerald", count: "3 Items" },
    { name: "Accessories", icon: "bi-eyeglasses", bg: "gradient-amber", count: "3 Items" },
    { name: "Home", icon: "bi-house-heart", bg: "gradient-rose", count: "3 Items" },
    { name: "Beauty", icon: "bi-flower1", bg: "gradient-pink", count: "3 Items" },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section text-white position-relative py-5">
        <div className="container py-lg-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-7 text-center text-lg-start">
              <span className="badge bg-primary bg-opacity-25 text-primary-light rounded-pill px-3 py-2 fw-semibold mb-3 border border-primary border-opacity-25">
                ⚡ New Season Collection 2026
              </span>
              <h1 className="display-3 fw-extrabold mb-4 hero-title">
                Next Generation <br />
                <span className="text-gradient">E-Commerce Experience</span>
              </h1>
              <p className="lead text-slate-300 mb-5 pe-lg-4 fs-5">
                Explore thousands of curated products from top global brands with instant local persistence, real-time reviews, and seamless checkout.
              </p>
              <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3">
                <Link to="/products" className="btn btn-primary btn-lg rounded-pill px-4 py-3 fw-bold shadow-lg shadow-primary hover-scale">
                  Shop Now <i className="bi bi-arrow-right ms-2"></i>
                </Link>
                <Link to="/register" className="btn btn-outline-light btn-lg rounded-pill px-4 py-3 fw-bold">
                  Create Account
                </Link>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="position-relative hero-img-wrapper">
                <div className="hero-card-floating shadow-lg rounded-4 p-3 bg-white text-dark position-absolute top-0 start-0 translate-middle-y z-2 border">
                  <div className="d-flex align-items-center gap-3">
                    <div className="icon-box bg-success bg-opacity-10 text-success rounded-3 p-2">
                      <i className="bi bi-shield-check fs-4"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">100% Secure</h6>
                      <small className="text-muted">LocalStorage Persisted</small>
                    </div>
                  </div>
                </div>

                <img 
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80" 
                  alt="Shopping Collection" 
                  className="img-fluid rounded-5 shadow-2xl hero-main-img"
                />

                <div className="hero-card-floating shadow-lg rounded-4 p-3 bg-white text-dark position-absolute bottom-0 end-0 translate-middle-y z-2 border">
                  <div className="d-flex align-items-center gap-3">
                    <div className="icon-box bg-warning bg-opacity-10 text-warning rounded-3 p-2">
                      <i className="bi bi-star-fill fs-4"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">4.9 / 5 Rating</h6>
                      <small className="text-muted">Over 1,200+ Reviews</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-4 bg-white border-bottom shadow-sm">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-3 col-6">
              <div className="d-flex align-items-center justify-content-center gap-3">
                <i className="bi bi-truck fs-2 text-primary"></i>
                <div className="text-start">
                  <h6 className="fw-bold mb-0">Free Shipping</h6>
                  <small className="text-muted">On orders over ₹999</small>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="d-flex align-items-center justify-content-center gap-3">
                <i className="bi bi-arrow-counterclockwise fs-2 text-primary"></i>
                <div className="text-start">
                  <h6 className="fw-bold mb-0">Easy Returns</h6>
                  <small className="text-muted">30 Days Return Policy</small>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="d-flex align-items-center justify-content-center gap-3">
                <i className="bi bi-shield-lock fs-2 text-primary"></i>
                <div className="text-start">
                  <h6 className="fw-bold mb-0">Safe Payment</h6>
                  <small className="text-muted">Fully Client-Side</small>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="d-flex align-items-center justify-content-center gap-3">
                <i className="bi bi-headset fs-2 text-primary"></i>
                <div className="text-start">
                  <h6 className="fw-bold mb-0">24/7 Support</h6>
                  <small className="text-muted">Dedicated Assistance</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <span className="text-primary fw-bold text-uppercase fs-7 letter-spacing-1">Explore</span>
              <h2 className="fw-bold text-dark mb-0">Shop by Category</h2>
            </div>
            <Link to="/products" className="btn btn-link text-primary fw-bold text-decoration-none p-0">
              View All <i className="bi bi-chevron-right"></i>
            </Link>
          </div>

          <div className="row g-4">
            {categories.map((cat, idx) => (
              <div key={idx} className="col-lg-2 col-md-4 col-6">
                <Link 
                  to={`/products?category=${cat.name}`} 
                  className="card text-decoration-none border-0 shadow-sm rounded-4 h-100 p-3 text-center category-card hover-lift"
                >
                  <div className={`category-icon-wrapper ${cat.bg} mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center`}>
                    <i className={`bi ${cat.icon} fs-3 text-white`}></i>
                  </div>
                  <h6 className="fw-bold text-dark mb-1">{cat.name}</h6>
                  <small className="text-muted">{cat.count}</small>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center mb-5 max-w-600 mx-auto">
            <span className="text-primary fw-bold text-uppercase fs-7 letter-spacing-1">Handpicked Favorites</span>
            <h2 className="fw-extrabold text-dark mb-2">Featured Products</h2>
            <p className="text-muted">Discover our highest rated items crafted with precision and style.</p>
          </div>

          <div className="row g-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="col-lg-4 col-md-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/products" className="btn btn-outline-primary btn-lg rounded-pill px-5 fw-bold">
              Explore All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="py-5 bg-dark text-white cta-banner position-relative overflow-hidden">
        <div className="container py-4 position-relative z-2 text-center">
          <h2 className="display-5 fw-extrabold mb-3">Upgrade Your Lifestyle Today</h2>
          <p className="lead text-slate-300 mb-4 max-w-600 mx-auto">
            Join thousands of satisfied shoppers. Enjoy fast filtering, seamless cart saving, and authentic customer ratings.
          </p>
          <Link to="/products" className="btn btn-light btn-lg rounded-pill px-5 py-3 fw-bold text-dark">
            Browse Catalog
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
