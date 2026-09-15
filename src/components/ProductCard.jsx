import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Rating from './Rating';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden product-card hover-lift transition-all">
      <div className="position-relative overflow-hidden bg-light" style={{ height: '220px' }}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-100 h-100 object-fit-cover product-img" 
        />
        <span className="position-absolute top-0 start-0 m-3 badge bg-dark bg-opacity-75 backdrop-blur rounded-pill text-capitalize px-3 py-2">
          {product.category}
        </span>
      </div>

      <div className="card-body d-flex flex-column p-4">
        <h5 className="card-title fw-bold fs-6 text-dark text-truncate mb-2" title={product.name}>
          {product.name}
        </h5>
        
        <div className="mb-3">
          <Rating product={product} />
        </div>

        <p className="card-text text-muted small text-truncate-2 mb-3 flex-grow-1" style={{ minHeight: '38px' }}>
          {product.description}
        </p>

        <div className="d-flex align-items-center justify-content-between pt-2 border-top">
          <div>
            <span className="text-muted fs-7 d-block">Price</span>
            <span className="fw-extrabold fs-5 text-primary">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="d-flex gap-2">
            <Link 
              to={`/product/${product.id}`} 
              className="btn btn-outline-secondary btn-sm rounded-3 px-3 d-flex align-items-center"
              title="View Details"
            >
              <i className="bi bi-eye"></i>
            </Link>

            <button 
              onClick={handleAddToCart}
              className={`btn btn-sm rounded-3 px-3 fw-semibold transition-all d-flex align-items-center gap-1 ${
                added ? 'btn-success' : 'btn-primary'
              }`}
            >
              <i className={`bi ${added ? 'bi-check-lg' : 'bi-bag-plus'}`}></i>
              <span>{added ? 'Added' : 'Add'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
