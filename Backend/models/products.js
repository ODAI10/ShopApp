const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  imageUrl: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  brand: { type: String },
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
