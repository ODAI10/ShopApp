import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Home from './components/home/Home';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Products from './components/products/products';
import Cart from './components/cart/Cart';
import Checkout from './components/Checkout/Checkout';
import ProductDetails from './components/ProductDetails/ProductDetails';
import AboutUs from './components/aboutUs/AboutUs';
import ContactUs from './components/ContactUs/ContactUs';
import Admins from './components/Dashbord/superAdminDashbord/Admins/Admins'
import Categories from './components/Dashbord/superAdminDashbord/categories/Categories'

// Layouts
import UserLayout from './Layouts/UserLayout';
import AdminLayout from './Layouts/AdminLayout';
import SuperAdminLayout from './Layouts/SuperAdminLayout';

// صفحات الداشبورد (محتوى داخلي)
import AdminHome from './components/Dashbord/AdminDashbord/AdminDashbord';
import InfoSuperAdmin from './components/Dashbord/superAdminDashbord/infoSuperAdmin/InfoSuperAdmin'
import Users from './components/Dashbord/superAdminDashbord/users/Users'
import ManageProducts from './components/Dashbord/superAdminDashbord/ManageProducts/ManageProducts'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
        .then(res => {
          setRole(res.data.user.role);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setRole('');
        });
    } else {
      setRole('');
    }
  }, [isLoggedIn]);

  return (
    <Routes>

      {/* صفحات المستخدم داخل Layout */}
      <Route path="/" element={
        <UserLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} role={role} setRole={setRole}>
          <Home />
        </UserLayout>
      } />
      <Route path="/login" element={
        <UserLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} role={role} setRole={setRole}>
          <Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />
        </UserLayout>
      } />
      <Route path="/register" element={
        <UserLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} role={role} setRole={setRole}>
          <Register />
        </UserLayout>
      } />
      <Route path="/products" element={
        <UserLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} role={role} setRole={setRole}>
          <Products />
        </UserLayout>
      } />
      <Route path="/cart" element={
        <UserLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} role={role} setRole={setRole}>
          <Cart />
        </UserLayout>
      } />
      <Route path="/checkout/:orderId" element={
        <UserLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} role={role} setRole={setRole}>
          <Checkout />
        </UserLayout>
      } />
      <Route path="/detailsProduct/:id" element={
        <UserLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} role={role} setRole={setRole}>
          <ProductDetails />
        </UserLayout>
      } />
      <Route path="/about" element={
        <UserLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} role={role} setRole={setRole}>
          <AboutUs />
        </UserLayout>
      } />
      <Route path="/contact" element={
        <UserLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} role={role} setRole={setRole}>
          <ContactUs />
        </UserLayout>
      } />

      {/* صفحات الأدمن */}
      <Route path="/dashboard/admins" element={
        <AdminLayout>
          <AdminHome />
        </AdminLayout>
      } />
    <Route path="/dashboard/superadmin" element={<SuperAdminLayout />}>
  <Route path="admins" element={<Admins />} />
  <Route path="information" element={<InfoSuperAdmin/> } />
  <Route path="Users" element={<Users/> } />
  <Route path="Categories" element={<Categories/> } />
    <Route path="Products" element={<ManageProducts/> } />

  {/* أضف المزيد هنا */}
</Route>


    </Routes>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
