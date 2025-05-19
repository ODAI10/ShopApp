import { useEffect, useState } from 'react';
import axios from 'axios';
import TitleSection from '../components/TitleSection';
import ProductCard from '../components/ProductCard';
import './products.css';
import CategoriesBar from '../components/CategoriesBar/CategoriesBar';
import '../App.css'
const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);  // حالة الفئة المحددة
  const [activeCategory, setActiveCategory] = useState(null);  // حالة الفئة النشطة

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // فلترة المنتجات بناءً على الفئة المحددة
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category._id === selectedCategory._id)
    : products;

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setActiveCategory(category);  // تعيين الفئة النشطة
  };

  return (
    <div className="productsPage ">
      <TitleSection title={'All Products'} />
      <CategoriesBar 
        categories={categories} 
        onCategorySelect={handleCategorySelect} 
        activeCategory={activeCategory}  // تمرير الفئة النشطة
      />
      <div className="products-container   container">
        {filteredProducts.map(product => (
          <ProductCard

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
