const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const path = require('path');

const app = express();
app.use(cors({
  origin: true, 
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());
// Routes
const categoryRoutes  = require("./routes/categoryRoutes");
const productRoutes  = require("./routes/productRoutes");
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require("./routes/ordersRoutes")

app.use("/api/categories", categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/ImgProducts', express.static(path.join(__dirname, 'public/ImgProducts')));
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes);
// Connect DB
const connectDB = require('./config/db');
connectDB(); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
