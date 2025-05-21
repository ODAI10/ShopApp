import React, { useEffect, useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './home.css';
import SliderBanner from '../SliderBanner';
import ProductCard from '../ProductCard';
import TitleSection from '../TitleSection';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const latestProducts = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const latestFourProducts = latestProducts.slice(0, 4);

  useEffect(() => {
     fetch('http://localhost:5000/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));

     fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

   const categoryMap = {};
  products.forEach((product) => {
    if (!categoryMap[product.category.name]) {
      categoryMap[product.category.name] = product;
    }
  });

   const uniqueCategoryProducts = Object.values(categoryMap);

   const firstFourProducts = uniqueCategoryProducts.slice(0, 4);

  return (
    <div className="home-container">
      <SliderBanner />

      <TitleSection title={'products'} />
      <div className="products-container container">
        {firstFourProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <TitleSection title={'Latest Products'} />
      <div className="products-container container">
        {latestFourProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <TitleSection title={'Featured Products'} />
      <div className="products-container container">
        {products
          .filter((p) => p.isFeatured)
          .slice(0, 4)
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Home;
