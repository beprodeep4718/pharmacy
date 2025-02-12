import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Signin successful!');
        localStorage.setItem('user', JSON.stringify(data));

       
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate('/'); 
        }, 2000);
      } else {
        setMessage(data.error || 'Signin failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-[linear-gradient(to_bottom,#4DD0E1,#FFFFFF)] relative">
      {/* Popup Notification */}
      {showPopup && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
          ✅ Successfully Logged In!
        </div>
      )}

      <div className="w-1/2 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-90">
          <h2 className="text-2xl font-bold text-center mb-6 monda">Welcome Back</h2>
          <h3 className="text-xl font-bold text-center mb-6 maven-pro">Sign in with email</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 maven-pro font-bold mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md bg-[#D2EDF0] focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                placeholder="Enter Your email address"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-gray-700 mb-2 maven-pro font-bold">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#D2EDF0] mb-1"
                placeholder="Enter Your Password"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-8 text-sm text-black hover:underline"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#00B6D4] text-white p-2 rounded-3xl hover:bg-blue-400 transition"
            >
              Sign In
            </button>
          </form>

          {message && (
            <div className="text-center mt-4 text-sm text-red-500">
              {message}
            </div>
          )}
        </div>
      </div>

      <div className="flex w-1/2 justify-center items-center mr-20">
        <img className="w-3/4 h-80" src="/assets/login.png" alt="Login Illustration" />
      </div>
    </div>
  );
};

export default Signin;
