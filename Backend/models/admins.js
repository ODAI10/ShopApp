const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
 
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  phone: { type: String, unique: true },
  role: { type: String, enum: [  'superadmin','admins'],default: 'admins', required: true },
  createdAt: { type: Date, default: Date.now }
});
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
