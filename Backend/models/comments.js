const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  commentText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  parentComment: { type: Schema.Types.ObjectId, ref: 'Comment' }
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
 