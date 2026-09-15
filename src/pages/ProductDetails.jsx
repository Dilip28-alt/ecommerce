import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { initialProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import Rating from '../components/Rating';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [, setRefreshKey] = useState(0);

  // Find product by ID
  const product = initialProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container py-5 text-center min-vh-50 d-flex flex-column justify-content-center align-items-center">
        <div className="display-1 text-muted mb-3">
          <i className="bi bi-exclamation-triangle"></i>
        </div>
        <h2 className="fw-bold text-dark mb-2">Product Not Found</h2>
        <p className="text-muted mb-4">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="btn btn-primary rounded-pill px-4">
          <i className="bi bi-arrow-left me-2"></i> Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleRatingSubmit = () => {
    // Trigger re-render to update dynamic average rating score on page
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="product-details-page py-5 bg-light min-vh-100">
      <div className="container">
        {/* Navigation Breadcrumb & Back button */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-outline-secondary btn-sm rounded-pill px-3 d-flex align-items-center gap-1"
          >
            <i className="bi bi-arrow-left"></i> Back to Products
          </button>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/products" className="text-decoration-none">Products</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
            </ol>
          </nav>
        </div>

        {/* Main Details Card */}
        <div className="card border-0 shadow-lg rounded-5 overflow-hidden bg-white">
          <div className="row g-0">
            {/* Image Column */}
            <div className="col-lg-6 bg-slate-100 position-relative p-4 p-lg-5 d-flex align-items-center justify-content-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="img-fluid rounded-4 shadow-sm detail-product-img object-fit-cover w-100"
                style={{ maxHeight: '480px' }}
              />
              <span className="position-absolute top-0 start-0 m-4 badge bg-primary rounded-pill px-3 py-2 fs-6">
                {product.category}
              </span>
            </div>

            {/* Content Column */}
            <div className="col-lg-6 p-4 p-lg-5 d-flex flex-column justify-content-between">
              <div>
                <span className="text-uppercase text-primary fw-bold fs-7 letter-spacing-1 d-block mb-1">
                  Product Details
                </span>
                <h1 className="fw-extrabold text-dark display-6 mb-3">{product.name}</h1>

                {/* Rating Section */}
                <div className="mb-4 p-3 bg-light rounded-4 border border-light-subtle">
                  <span className="fw-bold text-dark fs-7 d-block mb-1">Customer Reviews</span>
                  <Rating product={product} interactive={true} onRatingSubmit={handleRatingSubmit} />
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-muted fs-6 d-block mb-1">Price</span>
                  <div className="d-flex align-items-baseline gap-2">
                    <span className="display-6 fw-extrabold text-primary">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2 py-1 small">
                      In Stock
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <h6 className="fw-bold text-dark mb-2">Description</h6>
                  <p className="text-secondary leading-relaxed fs-6">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Action Controls */}
              <div className="pt-4 border-top">
                <div className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label className="fw-semibold text-muted small d-block mb-1">Quantity</label>
                    <div className="input-group quantity-selector rounded-3 overflow-hidden border">
                      <button 
                        className="btn btn-light border-0 px-3" 
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <input 
                        type="number" 
                        className="form-control text-center border-0 fw-bold bg-white" 
                        style={{ width: '50px' }}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        min="1"
                      />
                      <button 
                        className="btn btn-light border-0 px-3" 
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="col">
                    <label className="d-block mb-1 opacity-0">Action</label>
                    <button 
                      onClick={handleAddToCart}
                      className={`btn btn-lg w-100 rounded-4 fw-bold shadow-md transition-all d-flex align-items-center justify-content-center gap-2 ${
                        addedToast ? 'btn-success' : 'btn-primary'
                      }`}
                    >
                      <i className={`bi ${addedToast ? 'bi-check-circle-fill' : 'bi-bag-plus-fill'} fs-5`}></i>
                      <span>{addedToast ? 'Added to Cart!' : 'Add to Cart'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
