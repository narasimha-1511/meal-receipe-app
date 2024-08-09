import React from "react";
import "./CategoryFilter.css";

function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-button ${
            activeCategory === category ? "active" : ""
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
