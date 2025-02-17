import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    countryCode: '+91',
    password: ''
  });
  const [message, setMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: { firstname: formData.firstname, lastname: formData.lastname },
          email: formData.email,
          password: formData.password,
          phone: `${formData.countryCode}${formData.phone}`,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        navigate('/sign-in');
      } else {
        setMessage(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-[linear-gradient(to_bottom,#4DD0E1,#FFFFFF)]">
      <div className="w-1/2 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-90">
          <h2 className="text-2xl font-bold text-center mb-6 monda">Sign Up</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 maven-pro font-bold mb-2">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md bg-[#D2EDF0] focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 maven-pro font-bold mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md bg-[#D2EDF0] focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 maven-pro font-bold mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-[#D2EDF0] focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                placeholder="Enter Your Email Address"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 maven-pro font-bold mb-2">Phone Number</label>
              <div className="flex">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="p-2 border rounded-l-md bg-[#D2EDF0] focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+61">+61</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border-t border-b border-r rounded-r-md bg-[#D2EDF0] focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Your Phone Number"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-gray-700 mb-2 maven-pro font-bold">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
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
            <div className="text-center cursor-pointer text-sm text-gray-600 mb-4 underline maven-pro">
              Already registered? <Link to="/sign-in" className="underline maven-pro">Login!</Link>
            </div>
            <button
              type="submit"
              className="w-full bg-[#00B6D4] text-white p-2 rounded-3xl hover:bg-blue-400 transition"
            >
              Sign Up
            </button>
          </form>

          {message && <p className="text-center text-green-500 mt-4">{message}</p>}
        </div>
      </div>

      <div className="flex w-1/2 justify-center items-center mr-20">
        <img className='w-3/4 h-80' src="/assets/login.png" alt="" />
      </div>
    </div>
  );
};

export default Signup;
