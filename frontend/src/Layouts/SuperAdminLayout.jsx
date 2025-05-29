import SuperAdminDashbord from '../components/Dashbord/superAdminDashbord/SuperAdminDashbord';
import { Outlet } from 'react-router-dom';

const SuperAdminLayout = () => (
  <div className="d-flex">
    <SuperAdminDashbord />
    <div className="flex-grow-1 ">
      <Outlet />
    </div>
  </div>
); 

export default SuperAdminLayout;
