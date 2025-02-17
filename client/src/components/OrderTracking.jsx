import { FaCheckCircle } from "react-icons/fa";
import { MdLocalShipping, MdHome } from "react-icons/md";
import { GiBoxUnpacking } from "react-icons/gi";
import Navbar from "./Navbar";


const OrderTracking = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-blue-300">
        <Navbar />
      <div className="bg-white p-6 rounded-lg shadow-lg w-[700px]">
        {/* Order Details */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">
            ORDER <span className="text-blue-500">#Y34XDHR</span>
          </h2>
          <div className="text-right text-sm">
            <p>Expected Arrival 01/12/19</p>
            <p>USPS <span className="font-bold">23409456724243242898</span></p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative flex items-center">
          <div className="w-full h-1 bg-gray-300 absolute top-1/2 transform -translate-y-1/2"></div>
          <div className="w-3/4 h-1 bg-purple-500 absolute top-1/2 transform -translate-y-1/2"></div>

          {/* Steps */}
          <div className="flex justify-between w-full">
            <Step icon={<FaCheckCircle />} text="Order Processed" completed />
            <Step icon={<FaCheckCircle />} text="Order Shipped" completed />
            <Step icon={<FaCheckCircle />} text="Order En Route" completed />
            <Step icon={<MdHome />} text="Order Arrived" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Step Component
const Step = ({ icon, text, completed }) => {
  return (
    <div className="flex flex-col items-center text-center w-1/4">
      <div
        className={`text-3xl ${
          completed ? "text-purple-500" : "text-gray-400"
        } bg-white rounded-full p-2`}
      >
        {icon}
      </div>
      <p className="text-sm mt-2">{text}</p>
    </div>
  );
};

export default OrderTracking;
