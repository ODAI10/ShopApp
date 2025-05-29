import { Outlet } from 'react-router-dom';
import AdminDashbord from '../components/Dashbord/AdminDashbord/AdminDashbord';
import { useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import ChatWithAdmin from '../components/ChatwithAdmin/ChatPopup'; // عدل المسار حسب مشروعك

const AdminLayout = () => {
  const { role } = useContext(AuthContext);

  return (
    <div className="d-flex">
      {role === "admins" && <AdminDashbord />}
      <div className="flex-grow-1 position-relative">
        <Outlet />
        <ChatWithAdmin />
      </div>
    </div>
  );
};

export default AdminLayout;
