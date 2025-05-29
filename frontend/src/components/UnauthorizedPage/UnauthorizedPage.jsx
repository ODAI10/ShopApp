import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // يرجع المستخدم للصفحة السابقة
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Access Denied</h1>
      <p>You do not have permission to view this page.</p>
      <button onClick={goBack} className='btn btn-primary'>
        Go Back
      </button>
    </div>
  );
};

export default UnauthorizedPage;
