const mongoose = require('mongoose');
const { Schema } = mongoose;
const { orderItemSchema } = require('./order_items');

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  orderDate: { type: Date, default: Date.now },
  status: {
    type: String,
  enum: ['new', 'processing', 'shipped', 'completed', 'canceled', 'confirmed'],
    default: 'new'
  },
  totalAmount: { type: Number, required: true },
  shippingMethod: { type: String }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
 