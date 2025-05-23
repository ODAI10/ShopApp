const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  reviewText: { type: String },
  createdAt: { type: Date, default: Date.now },
  verifiedPurchase: { type: Boolean, default: false }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

