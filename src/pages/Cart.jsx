import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems, cartTotal } = useCart();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    clearCart();
  };

  return (
    <div className="cart-page py-5 bg-light min-vh-100">
      <div className="container">
        {/* Title Bar */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-extrabold text-dark display-6 mb-1">Shopping Cart</h1>
            <p className="text-muted mb-0">Manage your items and proceed to checkout.</p>
          </div>
          {cartItems.length > 0 && (
            <button 
              onClick={clearCart} 
              className="btn btn-outline-danger btn-sm rounded-pill px-3"
            >
              <i className="bi bi-trash me-1"></i> Clear Cart
            </button>
          )}
        </div>

        {checkoutSuccess && (
          <div className="alert alert-success alert-dismissible fade show rounded-4 p-4 mb-4 shadow-sm" role="alert">
            <h4 className="alert-heading fw-bold mb-2">
              <i className="bi bi-check-circle-fill me-2"></i> Order Placed Successfully!
            </h4>
            <p className="mb-0">
              Thank you for your simulated order! Your cart data has been cleared and stored session updated.
            </p>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setCheckoutSuccess(false)}
            ></button>
          </div>
        )}

        {cartItems.length > 0 ? (
          <div className="row g-4">
            {/* Cart Items List */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-4">
                <div className="card-header bg-white py-3 border-bottom">
                  <h6 className="fw-bold mb-0 text-dark">Cart Items ({totalItems})</h6>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light text-muted small text-uppercase">
                        <tr>
                          <th scope="col" className="ps-4">Product</th>
                          <th scope="col">Price</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Subtotal</th>
                          <th scope="col" className="pe-4 text-end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map(({ product, quantity }) => (
                          <tr key={product.id}>
                            {/* Product Info */}
                            <td className="ps-4 py-3">
                              <div className="d-flex align-items-center gap-3">
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="rounded-3 object-fit-cover shadow-xs"
                                  style={{ width: '60px', height: '60px' }}
                                />
                                <div>
                                  <Link 
                                    to={`/product/${product.id}`} 
                                    className="fw-bold text-dark text-decoration-none text-truncate d-block"
                                    style={{ maxWidth: '200px' }}
                                  >
                                    {product.name}
                                  </Link>
                                  <span className="badge bg-light text-secondary border small">
                                    {product.category}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Price */}
                            <td className="fw-semibold text-dark">
                              ₹{product.price.toLocaleString('en-IN')}
                            </td>

                            {/* Quantity Control */}
                            <td>
                              <div className="input-group quantity-btn-group rounded-3 overflow-hidden border" style={{ width: '110px' }}>
                                <button 
                                  className="btn btn-light btn-sm border-0" 
                                  type="button"
                                  onClick={() => updateQuantity(product.id, quantity - 1)}
                                >
                                  <i className="bi bi-dash"></i>
                                </button>
                                <span className="form-control form-control-sm text-center border-0 fw-bold bg-white">
                                  {quantity}
                                </span>
                                <button 
                                  className="btn btn-light btn-sm border-0" 
                                  type="button"
                                  onClick={() => updateQuantity(product.id, quantity + 1)}
                                >
                                  <i className="bi bi-plus"></i>
                                </button>
                              </div>
                            </td>

                            {/* Subtotal */}
                            <td className="fw-bold text-primary">
                              ₹{(product.price * quantity).toLocaleString('en-IN')}
                            </td>

                            {/* Remove Action */}
                            <td className="pe-4 text-end">
                              <button 
                                onClick={() => removeFromCart(product.id)}
                                className="btn btn-outline-danger btn-sm border-0 rounded-circle"
                                title="Remove Item"
                              >
                                <i className="bi bi-trash fs-6"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <Link to="/products" className="btn btn-outline-primary rounded-pill px-4 fw-semibold">
                <i className="bi bi-arrow-left me-2"></i> Continue Shopping
              </Link>
            </div>

            {/* Order Summary Sidebar */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white sticky-top" style={{ top: '100px' }}>
                <h5 className="fw-bold text-dark mb-4 pb-2 border-bottom">Order Summary</h5>

                <div className="d-flex justify-content-between mb-3 text-secondary">
                  <span>Total Items</span>
                  <span className="fw-bold text-dark">{totalItems}</span>
                </div>

                <div className="d-flex justify-content-between mb-3 text-secondary">
                  <span>Subtotal</span>
                  <span className="fw-bold text-dark">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="d-flex justify-content-between mb-3 text-secondary">
                  <span>Estimated Shipping</span>
                  <span className="text-success fw-semibold">FREE</span>
                </div>

                <hr className="my-3" />

                <div className="d-flex justify-content-between mb-4">
                  <span className="fs-5 fw-bold text-dark">Cart Total</span>
                  <span className="fs-4 fw-extrabold text-primary">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="btn btn-primary btn-lg w-100 rounded-4 fw-bold shadow-md hover-scale"
                >
                  Proceed to Checkout
                </button>

                <div className="text-center mt-3">
                  <small className="text-muted">
                    <i className="bi bi-shield-lock me-1"></i> Fast & Secure LocalStorage Sync
                  </small>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart View */
          <div className="card border-0 shadow-sm rounded-5 p-5 text-center bg-white my-4">
            <div className="display-1 text-muted mb-3">
              <i className="bi bi-cart-x"></i>
            </div>
            <h3 className="fw-bold text-dark mb-2">Your Cart is Empty</h3>
            <p className="text-muted mb-4 max-w-600 mx-auto">
              Looks like you haven't added any products to your shopping cart yet. Start exploring our categories!
            </p>
            <div>
              <Link to="/products" className="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-sm">
                Shop Products Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
