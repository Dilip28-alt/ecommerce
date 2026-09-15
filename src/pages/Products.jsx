import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { initialProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { getCalculatedProductRating } from '../utils/localStorage';
import '../styles/Products.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('default');

  // Sync category state when URL param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Combined Search + Category Filter + Sort
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        // Category filter
        const matchesCategory =
          selectedCategory === 'All' ||
          product.category.toLowerCase() === selectedCategory.toLowerCase();

        // Search filter (by name or category)
        const term = searchTerm.trim().toLowerCase();
        const matchesSearch =
          term === '' ||
          product.name.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') {
          const ratingA = getCalculatedProductRating(a).average;
          const ratingB = getCalculatedProductRating(b).average;
          return ratingB - ratingA;
        }
        return 0; // default order
      });
  }, [searchTerm, selectedCategory, sortBy]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('default');
    setSearchParams({});
  };

  return (
    <div className="products-page py-5 bg-light min-vh-100">
      <div className="container">
        {/* Header Title */}
        <div className="text-center max-w-600 mx-auto mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 fw-semibold mb-2">
            Catalog
          </span>
          <h1 className="fw-extrabold text-dark display-5">Explore Our Products</h1>
          <p className="text-muted fs-6">
            Discover premium items, filter by categories, and find exactly what you need.
          </p>
        </div>

        {/* Filter Controls Box */}
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-5 bg-white">
          <div className="row g-3 align-items-center">
            {/* Search Bar */}
            <div className="col-lg-6">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            {/* Sort Dropdown */}
            <div className="col-lg-6 d-flex justify-content-lg-end align-items-center gap-2">
              <label className="fw-semibold text-secondary small text-nowrap">Sort By:</label>
              <select
                className="form-select rounded-3 border-light-subtle shadow-sm w-auto fs-6"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Featured / Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Category Filter Pills */}
            <div className="col-12 pt-3 border-top mt-3">
              <CategoryFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={handleCategoryChange}
              />
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold text-dark mb-0 fs-6">
            Showing <span className="text-primary">{filteredProducts.length}</span> Products
          </h5>
          {(searchTerm || selectedCategory !== 'All' || sortBy !== 'default') && (
            <button
              onClick={handleResetFilters}
              className="btn btn-sm btn-outline-danger rounded-pill px-3"
            >
              <i className="bi bi-x-circle me-1"></i> Clear Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-lg-4 col-md-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-5 bg-white rounded-4 shadow-sm border my-4 p-5">
            <div className="display-1 text-muted mb-3">
              <i className="bi bi-search-heart"></i>
            </div>
            <h3 className="fw-bold text-dark mb-2">No Products Found</h3>
            <p className="text-muted mb-4 max-w-600 mx-auto">
              We couldn't find any products matching "<strong>{searchTerm || selectedCategory}</strong>". 
              Try searching with a different term or clearing your filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="btn btn-primary btn-lg rounded-pill px-4"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
