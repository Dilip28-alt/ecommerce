import React from 'react';
import { CATEGORIES } from '../data/products';

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="d-flex flex-wrap gap-2 align-items-center">
      <span className="fw-semibold text-secondary me-2 d-none d-md-inline small text-uppercase letter-spacing-1">
        Category:
      </span>
      {CATEGORIES.map((category) => (
        <button
          key={category}
          className={`btn btn-sm rounded-pill px-3 py-2 fw-medium transition-all ${
            selectedCategory === category
              ? 'btn-primary shadow-sm'
              : 'btn-outline-secondary bg-white text-dark border-light-subtle'
          }`}
          onClick={() => setSelectedCategory(category)}
          type="button"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
