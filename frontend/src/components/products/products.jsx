import { useEffect, useState } from 'react';
import axios from 'axios';
import TitleSection from '../../components/TitleSection/TitleSection';
import ProductCard from '../ProductCard/ProductCard';
import './products.css';
import CategoriesBar from '../CategoriesBar/CategoriesBar';
import '../../App.css'
const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);  
  const [activeCategory, setActiveCategory] = useState(null);  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products/users');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    const fetchCategories = async () => {
      try {
const res = await axios.get('http://localhost:5000/api/categories/user');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

   const filteredProducts = selectedCategory
    ? products.filter(product => product.category._id === selectedCategory._id)
    : products;

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setActiveCategory(category);  
  };

  return (
    <div className="productsPage py-5">
      <TitleSection title={'All Products'} />
      <CategoriesBar 
        categories={categories} 
        onCategorySelect={handleCategorySelect} 
        activeCategory={activeCategory}  // تمرير الفئة النشطة
      />
      <div className="products-container   container">
        {filteredProducts.map(product => (
          <ProductCard
            key={product._id}
            product={product}
            showDescription={true}
            showMore={true}
            showAddToCart={true}
          />
         ))}
      </div>
    </div>
  );
};

export default Products;
