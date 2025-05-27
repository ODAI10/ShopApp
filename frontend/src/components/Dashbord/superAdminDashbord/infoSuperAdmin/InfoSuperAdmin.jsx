import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../SuperAdminDashbord.css'; 

const InfoSuperAdmin = () => {
  const [adminData, setAdminData] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminRes = await axios.get('http://localhost:5000/api/admins/CurrentAdmin', {
          withCredentials: true,
        });
        setAdminData(adminRes.data);

        const usersRes = await axios.get('http://localhost:5000/api/users/allUsers', {
          withCredentials: true,
        });
        setUserCount(usersRes.data.length);

        const adminsRes = await axios.get('http://localhost:5000/api/admins/admins', {
          withCredentials: true,
        });
        setAdminCount(adminsRes.data.admins.length);

        const ordersRes = await axios.get('http://localhost:5000/api/order/orders/all', {
          withCredentials: true,
        });
        setOrderCount(ordersRes.data.orders.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="superadmin-main ">
      <div className="superadmin-content container">
        <h2>Welcome, {adminData?.name || 'Super Admin'}</h2>
        <p className="text-muted">Here you can manage all aspects of the system.</p>

        {adminData && (
          <div className="col-12 mt-4">
            <div className="card superadmin-card bg-white border-0">
              <div className="card-body">
                <h5 className="card-title text-primary mb-3">Super Admin Information</h5>
                <p><strong>Name:</strong> {adminData.name}</p>
                <p><strong>Email:</strong> {adminData.email}</p>
                <p><strong>Phone:</strong> {adminData.phone}</p>
                <p><strong>Role:</strong> {adminData.role}</p>
                <p><strong>Created At:</strong> {new Date(adminData.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card superadmin-card">
              <div className="card-body">
                <h5 className="card-title">Total Users</h5>
                <p className="card-text">{userCount}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card superadmin-card">
              <div className="card-body">
                <h5 className="card-title">Total Admins</h5>
                <p className="card-text">{adminCount}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card superadmin-card">
              <div className="card-body">
                <h5 className="card-title">Total Orders</h5>
                <p className="card-text">{orderCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSuperAdmin;
