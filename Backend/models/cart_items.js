const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 },
  addedAt: { type: Date, default: Date.now }
});


const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
