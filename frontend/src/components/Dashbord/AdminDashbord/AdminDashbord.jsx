import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SuperAdminDashboard = () => {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '250px', backgroundColor: '#1e293b' }}>
        <h4 className="mb-4">SuperAdmin</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">Dashboard</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">Manage Admins</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">Site Settings</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">Reports</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-danger" href="#">Logout</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 bg-light">
        {/* Header */}
        <nav className="navbar navbar-light bg-white px-4 shadow-sm">
          <span className="navbar-brand mb-0 h5">Dashboard</span>
        </nav>

        {/* Content */}
        <div className="container p-4">
          <h2>Welcome, Super Admin</h2>
          <p className="text-muted">Here you can manage all aspects of the system.</p>

          {/* Example Cards */}
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text">1,250</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="card-title">Active Admins</h5>
                  <p className="card-text">15</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="card-title">Pending Requests</h5>
                  <p className="card-text">4</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
