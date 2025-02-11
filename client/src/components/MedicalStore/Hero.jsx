import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Hero = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products`);
        setMedicines(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#6193FF] to-[#007BFF] p-8 md:p-16 rounded-t-3xl">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img src="/assets/medishop.png" alt="Healthcare" className="w-[380px] h-[420px] -mb-16 ml-20" />
        </div>

        <div className="w-full md:w-1/2 md:pl-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-black leading-loose text-nowrap">
            Your Trusted Online Pharmacy Solution
          </h1>
          <p className="text-black text-lg mt-4 text-right mr-10">
            Effortless medication management and online ordering with our secure, user-friendly platform. Enjoy seamless access to your prescriptions and timely reminders—keeping your health care simple and hassle-free.
          </p>

          <div className="bg-blue-100 border-l-4 border-blue-600 p-4 mt-8 rounded-md shadow-sm">
            <p className="text-blue-800 font-semibold">
              💡 Stay Healthy: Get your medications delivered to your doorstep!
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-700">🔥 Today's Best Deals</h2>
          <button className="text-blue-600 hover:text-blue-800 font-semibold focus:outline-none">
            See More →
          </button>
        </div>

        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading products...</p>
        ) : medicines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicines.map((med) => (
              <div key={med._id} className="bg-white rounded-xl shadow-md overflow-hidden p-4 hover:shadow-xl transition">
                <img src={med.image} alt={med.name} className="w-full h-60 object-cover rounded-md" />
                <h3 className="text-xl font-bold mt-2">{med.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{med.description}</p>
                <p className="text-blue-600 font-semibold mt-2">${med.price.toFixed(2)}</p>
                <p className={`mt-1 ${med.availability ? 'text-green-500' : 'text-red-500'}`}>
                  {med.availability ? 'In Stock' : 'Out of Stock'}
                </p>
                <button
                  disabled={!med.availability}
                  className={`w-full mt-3 py-2 rounded-md text-white transition ${
                    med.availability
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {med.availability ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-500">No products available at the moment.</p>
        )}
      </section>
    </div>
  );
};

export default Hero;
