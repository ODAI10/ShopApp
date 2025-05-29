import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SuperAdminDashbord.css';
import { NavLink, useNavigate } from 'react-router-dom';

const SuperAdminDashboard = () => {
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
    <div className="superadmin-container">
      <div className="superadmin-sidebar">
        <h4>SuperAdmin</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <NavLink className="nav-link" to="/dashboard/superadmin/information">Super Admin Dashboard</NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink className="nav-link" to="/dashboard/superadmin/Admins">Admins</NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink className="nav-link" to="/dashboard/superadmin/users">Users</NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink className="nav-link" to="/dashboard/superadmin/products">Products</NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink className="nav-link" to="/dashboard/superadmin/categories">Categories</NavLink>
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

export default SuperAdminDashboard;
