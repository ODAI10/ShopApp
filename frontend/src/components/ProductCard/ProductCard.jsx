import React from 'react';
import axios from 'axios'; 
import './ProductCard.css';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import { AuthContext } from '../../Auth/AuthContext';
import { useContext } from 'react';

const ProductCard = ({
  product,
  showDescription = true,
  quantity,
  showQuantity = false,
  showMore = true,
  showAddToCart = true,
  showRemoveButton = false,
  onRemove,
}) => {
  if (!product) return null;

  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const handleShowMore = () => {
    navigate(`/detailsProduct/${product._id}`);
  };

  const handleAddToCart = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart",
        { product: product._id, quantity: 1 },
        { withCredentials: true }
      );
      alert("Added to cart successfully!");
    } catch (error) {
      console.error("Failed to add to cart:", error.response?.data || error.message);
      alert("Failed to add to cart");
    }
  };

  const handleRedirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product?.imageUrl ? `http://localhost:5000${product.imageUrl}` : '/default-image.jpg'}
          alt={product?.name || 'Product'}
          className="product-image"
        />
      </div>

      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>

        {showDescription && product.description && (
          <p className="product-description">
            {product.description.length > 50
              ? product.description.slice(0, 50) + '...'
              : product.description}
          </p>
        )}

        <p className="product-price">${product.price}</p>
        <p className="product-brand">Brand: {product.brand}</p>

        {showQuantity && quantity && (
          <p className="product-quantity">Quantity: {quantity}</p>
        )}

        <div className="buttonsCard">
          {showMore && (
            <button className="show-more-btn" onClick={handleShowMore}>
              Show More Details
            </button>
          )}

          {showAddToCart && (
            isLoggedIn ? (
              <button className="buy-btn" onClick={handleAddToCart}>
                <FaShoppingCart /> Add to Cart
              </button>
            ) : (
              <button className="buy-btn" onClick={handleRedirectToLogin}>
                <FaShoppingCart /> Login to Buy
              </button>
            )
          )}

          {showRemoveButton && (
            <button className="remove-btn" onClick={onRemove}>
              Remove from Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
