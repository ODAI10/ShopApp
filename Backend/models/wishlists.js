const mongoose = require('mongoose');
const { Schema } = mongoose;

const wishlistSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  addedAt: { type: Date, default: Date.now }
});
const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;

