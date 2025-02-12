import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user')); 

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('user'));
    };

    window.addEventListener('storage', handleStorageChange); 
    return () => {
      window.removeEventListener('storage', handleStorageChange); 
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-500 absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-transparent text-white">
      <h1 className="text-2xl font-bold">My Website</h1>

      {isLoggedIn ? (
        <Link
          to="/profile"
          className="px-4 py-2 bg-[#89B4FF] text-white font-semibold rounded-lg shadow-md hover:bg-gray-200 flex gap-2"
        >
          <CgProfile className='h-[26px] text-black' />
          My Profile
        </Link>
      ) : (
        <Link
          to="/sign-in"
          className="px-4 py-2 bg-[#89B4FF] text-white font-semibold rounded-lg shadow-md hover:bg-gray-200"
        >
          Sign In
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
