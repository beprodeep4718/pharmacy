import React, { useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const userInfoResponse = await axios.get('http://localhost:5000/user/userinfo', {
          withCredentials: true,
        });
        const userId = userInfoResponse.data._id;
        const cartResponse = await axios.get(`http://localhost:5000/user/cart/${userId}`, {
          withCredentials: true,
        });
        console.log('Cart Data:', cartResponse.data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);

  return (
    <div>
      Hekllo
    </div>
  );
};

export default Cart;
