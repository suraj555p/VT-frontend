// src/components/Auth/Logout.jsx
import React, { useEffect } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        // 1. Remove user info from localStorage
        localStorage.removeItem('videotube-user');

        // 2. Send request to backend to clear token cookie
        await axios.post('/users/logout', {}, {
          withCredentials: true,
        });

        alert("Logout successful");
        navigate('/login');
      } catch (error) {
        console.error("Logout error", error);
        alert("Logout failed");
      }
    };

    doLogout();
  }, [navigate]);

  return (
    <div className="text-center p-4 text-lg font-semibold">
      Logging you out...
    </div>
  );
};

export default Logout;
