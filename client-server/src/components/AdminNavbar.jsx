import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../utils/localStorage';

export default function AdminNavbar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };
  
  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="font-bold text-xl">ParcelDelivery Admin</span>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}