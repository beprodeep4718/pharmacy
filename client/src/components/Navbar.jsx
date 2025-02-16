import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import axios from 'axios';

const Navbar = () => {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/userinfo`, {
          withCredentials: true,
        });
        setUser(response.data); // User is logged in
      } catch (error) {
        setUser(null); // User is not logged in
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/logout`, {}, { withCredentials: true });
      setUser(null); // Clear user data after logout
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-500 absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-transparent text-white">
      <h1 className="text-2xl font-bold">My Website</h1>

      {user ? (
        <div className="flex gap-4">
          <Link
            to="/profile"
            className="px-4 py-2 bg-[#89B4FF] text-white font-semibold rounded-lg shadow-md hover:bg-gray-200 flex gap-2"
          >
            <CgProfile className='h-[26px] text-black' />
            My Profile
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
