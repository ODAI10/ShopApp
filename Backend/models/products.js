const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, min: 0 },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  imageUrl: {
  type: String,
  required: true,
  validate: {
    validator: function (v) {
      return /\.(jpg|jpeg|png|webp|gif)$/i.test(v);
    },
    message: props => `${props.value} is not a valid image file path!`
  }
},
  
  brand: String,
  isFeatured: { type: Boolean, default: false }
});


module.exports = mongoose.model('Product', productSchema);
