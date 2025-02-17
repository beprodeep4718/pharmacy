import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const userInfoResponse = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/userinfo`, {
          withCredentials: true,
        });
        const userId = userInfoResponse.data._id;
        const cartResponse = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/cart/${userId}`, {
          withCredentials: true,
        });
        setCartData(cartResponse.data.cart); // Store cart data in state
      } catch (error) {
        console.error('Error fetching cart data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchCartData();
  }, []);

  const calculateTotalMRP = () => {
    return cartData.reduce((total, item) => {
      return total + item.product.price * item.quantity; 
    }, 0).toFixed(2);
  };

  return (
    <>
    <Searchbar />
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Your Cart</h1>

      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading cart items...</p>
      ) : cartData.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-6 flex items-center justify-center ">
          {cartData.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition w-4/5 bg-gradient-to-br from-[#9FE3F2] to-white text-black"
            >
              {/* Image Section (left) */}
              <div className="w-1/4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-60 object-cover rounded-md"
                />
              </div>

              <div className="flex flex-col justify-between w-4/6 ml-4">
                <h3 className="text-xl font-semibold monda">{item.product.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.product.category}</p>
                <p className="text-gray-600 text-sm mt-1">{item.product.description}</p>

                <div className="flex justify-between items-center mt-4">
                 
                  <div>
                    <p className="text-blue-600 font-semibold">
                      ${((item.product.price - (item.product.price * item.product.discount) / 100) * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-gray-500 text-sm line-through">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="text-gray-600">
                    <p className="text-sm">Quantity: {item.quantity}</p>
                    <p className={`text-sm ${item.product.availability ? 'text-green-500' : 'text-red-500'}`}>
                      {item.product.availability ? 'In Stock' : 'Out of Stock'}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Delivered by tomorrow</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      
      {cartData.length > 0 && (
        <div className="mt-10 flex justify-between  items-center bg-white p-4 rounded-xl shadow-md">
          
          <p className="text-blue-600 text-xl font-semibold text-">Total MRP: ${calculateTotalMRP()}</p>
          <button className="bg-blue-600 text-white w-40 h-10 rounded-md font-semibold hover:bg-blue-700">
              Buy Now
            </button>
        </div>
      )}
    </div>
    </>
  );
};

export default Cart;
