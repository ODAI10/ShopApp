import React from 'react';
import MainNav from '../components/MainNav/MainNav';
import Footer from '../components/Foter/Footer';

const UserLayout = ({ children, isLoggedIn, setIsLoggedIn, role, setRole }) => (
  <>
    <MainNav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} role={role} setRole={setRole} />
    {children}
    {(!role || role === 'user') && <Footer />}
  </>
);

export default UserLayout;
