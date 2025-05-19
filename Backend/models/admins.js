const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  phone: { type: String, unique: true },
  role: { type: String, enum: ['moderator', 'manager', 'superadmin'], default: 'moderator' },
  createdAt: { type: Date, default: Date.now }
});
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
