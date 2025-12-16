import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/'); // Navigate to home page instead of login
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold">
            CampusConnect
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="hover:bg-indigo-700 px-3 py-2 rounded transition"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="hover:bg-indigo-700 px-3 py-2 rounded transition"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="hover:bg-indigo-700 px-4 py-2 rounded transition"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-indigo-600 hover:bg-gray-100 px-4 py-2 rounded font-semibold transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;