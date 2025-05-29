import React, { useEffect, useState } from 'react';
import MainNav from '../components/MainNav/MainNav';
import Footer from '../components/Foter/Footer';
import ChatWithAdmin from '../components/ChatwithAdmin/ChatPopup';
import * as jwtDecode from 'jwt-decode';

const UserLayout = ({ children }) => {
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getRoleFromToken = () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];

        if (token) {
          const decoded = jwtDecode(token);
          setRole(decoded.role);
          setIsLoggedIn(true);
        } else {
          setRole(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setRole(null);
        setIsLoggedIn(false);
      }
    };

    getRoleFromToken();

    // (اختياري) إذا عندك تسجيل دخول في مكان آخر، ممكن تعمل dispatch لهذا الحدث بعده
    window.addEventListener('login', getRoleFromToken);

    return () => {
      window.removeEventListener('login', getRoleFromToken);
    };
  }, []);

  return (
    <>
      <MainNav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} role={role} setRole={setRole} />
      {children}
      {role === 'user' && <ChatWithAdmin />}
      {(!role || role === 'user') && <Footer />}
    </>
  );
};

export default UserLayout;
