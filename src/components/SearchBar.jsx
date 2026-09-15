import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="position-relative w-100">
      <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted fs-6"></i>
      <input
        type="text"
        className="form-control form-control-lg ps-5 pe-5 rounded-3 border-1 bg-white shadow-sm fs-6"
        placeholder="Search products by name or category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button
          className="btn btn-sm btn-link text-secondary position-absolute top-50 end-0 translate-middle-y me-2 text-decoration-none"
          onClick={() => setSearchTerm('')}
          type="button"
        >
          <i className="bi bi-x-circle-fill fs-5"></i>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
