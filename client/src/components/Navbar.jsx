import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { FiMenu, FiX } from 'react-icons/fi';
import axios from 'axios';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/userinfo`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/logout`, {}, { withCredentials: true });
      setUser(null);
      setMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-500 w-full p-4 flex justify-between items-center text-white fixed top-0 left-0 z-50">
      <h1 className="text-2xl font-bold">My Website</h1>
      
      {/* Hamburger Menu */}
      <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-4">
        {user ? (
          <>
            <Link
              to="/profile"
              className="px-4 py-2 bg-[#89B4FF] text-white font-semibold rounded-lg shadow-md hover:bg-gray-200 flex gap-2 items-center"
            >
              <CgProfile className="h-[26px] text-black" /> My Profile
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/sign-in"
              className="px-4 py-2 bg-[#89B4FF] text-white font-semibold rounded-lg shadow-md hover:bg-gray-200"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="px-4 py-2 text-[#89B4FF] bg-white font-semibold rounded-lg shadow-md hover:bg-gray-200"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-blue-800 flex flex-col gap-4 p-4 md:hidden">
          {user ? (
            <>
              <Link
                to="/profile"
                className="px-4 py-2 bg-[#89B4FF] text-white font-semibold rounded-lg shadow-md hover:bg-gray-200 flex gap-2 items-center"
                onClick={() => setMenuOpen(false)}
              >
                <CgProfile className="h-[26px] text-black" /> My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/sign-in"
                className="px-4 py-2 bg-[#89B4FF] text-white font-semibold rounded-lg shadow-md hover:bg-gray-200"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="px-4 py-2 text-[#89B4FF] bg-white font-semibold rounded-lg shadow-md hover:bg-gray-200"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
