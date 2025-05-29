import React, { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';
import TitleSection from '../../components/TitleSection/TitleSection';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/me', { withCredentials: true })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  // جلب التعليقات
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/comments/${id}`, { withCredentials: true });
        setComments(res.data);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };
    fetchComments();
  }, [id]);

  // إرسال تعليق جديد
  const handleSendComment = async () => {
    if (!newComment.trim()) return;

    if (!user) {
      alert("You must login to add a comment.");
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/comments',
        { productId: id, commentText: newComment },
        { withCredentials: true }
      );
      
      setNewComment('');
      // تحديث التعليقات بعد الإضافة
      const res = await axios.get(`http://localhost:5000/api/comments/${id}`, { withCredentials: true });
      setComments(res.data);
      setShowAllComments(false); // بعد الإضافة نرجع نعرض أول 3 فقط
    } catch (error) {
      console.error('Failed to add comment:', error);
      alert('Failed to add comment.');
    }
  };

  // حذف تعليق
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`, { withCredentials: true });
      setComments(prev => prev.filter(c => c._id !== commentId));
    } catch (error) {
      console.error('Failed to delete comment:', error);
      alert('Failed to delete comment.');
    }
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

  if (!product) return <div className="text-center py-5">Loading...</div>;

  // دالة لتحويل الوقت إلى "منذ"
  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + (interval === 1 ? " hour ago" : " hours ago");
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + (interval === 1 ? " minute ago" : " minutes ago");
    return "Just now";
  };

  // التعليقات التي سيتم عرضها (3 أولى أو كلها حسب الحالة)
  const displayedComments = showAllComments ? comments : comments.slice(0, 3);

  return (
    <div className="py-5">
      <TitleSection title="Product Details" />
      <div className="row align-items-center ProductDetails">
        {/* صورة المنتج */}
        <div className="col-md-6 text-center mb-3 mb-md-0">
          <img
            src={`http://localhost:5000${product.imageUrl}`}
            alt={product.name}
            className="img-fluid product-image"
          />
        </div>

        {/* تفاصيل المنتج */}
        <div className="col-md-6 product_info">
          <h2 className="product-title mb-3">{product.name}</h2>
          <p className="product-description-detiles text-muted mb-3">{product.description}</p>

          <div className="product-details-grid">
            <div className="detail-box">
              <h5>Price</h5>
              <p>${product.price}</p>
            </div>
            <div className="detail-box">
              <h5>In Stock</h5>
              <p>{product.stock}</p>
            </div>
            <div className="detail-box">
              <h5>Brand</h5>
              <p>{product.brand}</p>
            </div>
            <div className="detail-box">
              <h5>Category</h5>
              <p>{product.category?.name}</p>
            </div>
          </div>

          <div className='buttons mt-4'>
            {user ? (
              <button className="btn btn-success mx-2" onClick={handleAddToCart}>
                Add to Cart
              </button>
            ) : (
              <button className="btn btn-warning mx-2" onClick={handleRedirectToLogin}>
                Login to Buy
              </button>
            )}
            <button className="btn btn-info" onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>
      </div>

      {/* التعليقات */}
      <h2 className='CommentsTiltel'>Comments</h2>
      <div className="comment-section row mt-2">
        {comments.length === 0 && <p className="col-12">No comments yet.</p>}

        {displayedComments.map(c => (
          <div key={c._id} className="col-12 comment" style={{ position: 'relative' }}>
            <div className="author">{c.user?.name}</div>
            <div className="text">{c.commentText}</div>
            <div className="timestamp">{timeSince(c.createdAt)}</div>
            {/* أيقونة الحذف تظهر فقط لصاحب التعليق */}
            {user && user._id === c.user?._id && (
              <button
                onClick={() => handleDeleteComment(c._id)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '10px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: 'red',
                }}
                title="Delete comment"
                aria-label="Delete comment"
              >
                🗑️
              </button>
            )}
          </div>
        ))}

        {/* زر عرض المزيد إذا كان عدد التعليقات أكبر من 3 */}
        {comments.length > 3 && !showAllComments && (
          <div className="col-12 text-center mt-3">
            <button
              className="btn btn-link text-primary"
              style={{ textDecoration: 'underline', fontWeight: 'bold' }}
              onClick={() => setShowAllComments(true)}
            >
              Show more comments
            </button>
          </div>
        )}
      </div>

      {/* صندوق إضافة تعليق */}
      {user && (
        <div className="chat-comment mt-4">
          <textarea
            className="chat-textarea"
            placeholder="Add comment..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            rows={3}
          />
          <button className="chat-send-btn" onClick={handleSendComment}>
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
