import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../superAdminDashbord/SuperAdminDashbord';

const AdminDashobrd = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.delete('http://localhost:5000/api/auth/logout', {
        withCredentials: true,
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="superadmin-container  ">
      {/* Sidebar */}
      <div className="superadmin-sidebar ">
        <h4>Admin</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <NavLink className="nav-link" to="/dashboard/admins/information"> Admin Dashboard</NavLink>
          </li>
          <li className="nav-item mb-2"> 
            <NavLink className="nav-link" to="/dashboard/admins/products">Products</NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink className="nav-link" to="/dashboard/admins/categories">Catigories</NavLink>
          </li>
       
          <li className="nav-item">
            <button className="nav-link text-danger btn btn-link" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>

  
    </div>
  );
};

export default AdminDashobrd;
