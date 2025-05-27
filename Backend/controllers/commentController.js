
const Comment  = require("../models/comments")
// show comments for product by id
const getCommentsByProduct  = async (req, res)=>{
    try {
        const {productId } = req.params
        const comments =  await Comment.find({product:productId })
        .populate('user', 'name email')
        .sort({ createdAt: -1 });
         res.status(200).json(comments);

    } catch (error) {
         res.status(500).json({ message: 'Failed to fetch comments' });

    }
}

// add comment to product
const createComment  = async (req,res)=>{

    try {
        const { commentText, productId} = req.body
        const userId  = req.user.userId

        const newComment  = new Comment ({
            user:userId,
            product:productId ,
            commentText
        })
        const saved = await newComment.save()
             
        res.status(201).json(saved);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to add comment' });

    }
}

// delete comment 
const deletComment = async (req,res) => {
  try {
    const commentId = req.params.commentId;
        const userId  = req.user.userId

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }



   if (comment.user._id.toString() !== userId) {
  return res.status(403).json({ message: 'You are not authorized to delete this comment' });
}


    await Comment.findByIdAndDelete(commentId);

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {getCommentsByProduct,createComment,deletComment }