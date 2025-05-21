



const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true }
});

module.exports = { orderItemSchema };
