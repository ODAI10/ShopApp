import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './ManageComments.css'
const ManageComments = () => {
  const { productId } = useParams();
  const [comments, setComments] = useState([]);
const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/${productId}`, {
        withCredentials: true,
      });
      setComments(res.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
        withCredentials: true,
      });
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [productId]);
const handleAddComment = async () => {
  if (!newComment.trim()) return;

  try {
    await axios.post(
      "http://localhost:5000/api/comments",
      {
        productId,
        commentText: newComment
      },
      { withCredentials: true }
    );
    setNewComment(""); // تفريغ الحقل
    fetchComments(); // إعادة تحميل التعليقات
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};

  return (
    <div className="container py-4">
      <h2 className="mb-4">Comments for Product</h2>
      {comments.length === 0 ? (
        <p className="text-muted">No comments found.</p>
      ) : (
       <div className="row">
  {comments.map((comment) => (
    <div key={comment._id} className="col-12 mb-3">
      <div className="card shadow-sm">
        <div className="card-body d-flex justify-content-between align-items-center">
          <p className="mb-0">{comment.commentText}</p>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDeleteComment(comment._id)}
          >
            Delete
          </button>
        </div>
        
      </div>
      
    </div>
  ))}
  
</div>

      )}
      <div className="mt-4">
  <h5>Add a Comment</h5>
  <div className="input-group">
    <input
      type="text"
      className="form-control"
      placeholder="Write your comment..."
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
    />
    <button className="btn btn-primary" onClick={handleAddComment}>
      Add
    </button>
  </div>
</div>

    </div>
  );
};

export default ManageComments;
