import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [disease, setDisease] = useState('');
  const [medicines, setMedicines] = useState(['', '']);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/userinfo`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/logout`, {}, { withCredentials: true });
      setUser(null);
      navigate("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  };
  

  const handleMedicineChange = (index, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index] = value;
    setMedicines(updatedMedicines);
  };

  const addMoreMedicine = () => {
    setMedicines((prevMedicines) => [...prevMedicines, '']);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/user/update`,
        { disease, medicines },
        { withCredentials: true }
      );
      console.log('Changes saved:', response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-white p-4">
      <div className="w-1/2 flex flex-col items-center bg-white p-8 justify-center mr-4">
        <div className="relative border-2 py-10 px-4">
          <img
            src={avatar || '/assets/profileavatar.png'}
            alt="Avatar"
            className="w-40 h-40 rounded-full border-4 border-blue-500 object-cover ml-18"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="mt-2 text-sm text-gray-700 ml-16"
          />
          <h2 className="text-2xl font-bold mt-4 text-blue-800 text-center">
            {user.fullname.firstname} {user.fullname.lastname}
          </h2>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg shadow-md transition"
        >
          Save Changes
        </button>

        <Link to="/pharmacy-store" className="bg-[#BBE3FF] monda h-20 shadow-2xl py-2 px-3 rounded-2xl mt-5 flex w-80">
          Check Availability for required medicines <FaArrowRight className="mr-5 mt-4 w-[20px]" />
        </Link>

        <Link to="/medicine-alarm" className="bg-[#BBE3FF] monda h-20 shadow-2xl py-6 px-3 rounded-2xl mt-5 flex w-80">
          Add Reminders <FaArrowRight className="ml-5 mt-1 w-[20px]" />
        </Link>

        {/* 🚪 Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg shadow-md transition"
        >
          Logout
        </button>
      </div>

      <div className="w-1/2 max-w-md p-6 bg-white overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-4 text-blue-800 monda">Edit Personal Information</h2>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-800 monda">Health Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Diseases You Have:</label>
            <input
              type="text"
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              placeholder="Enter any diseases"
              className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold monda">Medicines:</label>
            {medicines.map((medicine, index) => (
              <input
                key={index}
                type="text"
                value={medicine}
                onChange={(e) => handleMedicineChange(index, e.target.value)}
                placeholder={`Medicine ${index + 1}`}
                className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
              />
            ))}

            <button
              type="button"
              onClick={addMoreMedicine}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 w-40 shadow-md transition mt-2 rounded-3xl"
            >
              Add More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
