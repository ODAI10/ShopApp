import React from 'react';
import './CategoriesBar.css';

const CategoriesBar = ({ categories, onCategorySelect, activeCategory }) => {
  return (
    <div className="categories-bar">
      {/* إضافة "All Products" */}
      <div 
        key="all-products" 
        className={`category ${activeCategory === null ? 'active' : ''}`}
        onClick={() => onCategorySelect(null)}  
      >
        <div>All Products</div>
      </div>
      
      {/* عرض الفئات الأخرى */}
      {categories.map((category) => (
        <div 
          key={category._id} 
          className={`category ${activeCategory && activeCategory._id === category._id ? 'active' : ''}`}
          onClick={() => onCategorySelect(category)} 
        >
          <div>{category.name}</div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesBar;
