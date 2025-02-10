import React, { useState } from 'react';
import { BsCart4 } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
const Searchbar = () => {
  const [location, setLocation] = useState('Kolkata'); 
  const locations = ['Kolkata', 'Chennai', 'Delhi', 'Mumbai', 'Hydrabad'];

  return (

    <nav className="bg-[#89B4FF] text-black p-4 shadow-md  w-full z-50 mt-5 mb-5">
    <div className="container mx-auto flex items-center justify-between gap-2 flex-wrap">
    <div className="text-2xl font-bold">HealthCare App</div>


<div className="flex items-center bg-white rounded-md overflow-hidden mx-4 w-1/3 ">
  <input
    type="text"
    placeholder="Search for medicines or services..."
    className="px-4 py-2 w-full text-gray-800 outline-none "
  />
  <button className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 transition">
    Search
  </button>
</div>

<div className="relative flex mx-4">
<FiMapPin  className='mt-3 '/>
  <select
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    className="bg-[#89B4FF] text-black px-2 py-2 rounded-md focus:outline-none cursor-pointer "
  >
    {locations.map((loc, index) => (
      <option key={index} value={loc} className="text-black ">
        {loc}
      </option>
    ))}
  </select>
</div>


<div className='flex gap-3'>
<BsCart4 className="w-full h-[35px] scale-x-[-1]" />
<button className="bg-white text-blue-600 px-6 py-2 rounded-md hover:bg-gray-200 transition">
  Login
</button></div>
    </div>
  </nav>
  );
};

export default Searchbar;
