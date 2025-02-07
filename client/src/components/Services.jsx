import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();

  const cards = [
    {
      image: '/assets/storecard.png',
      title: 'Our Pharmacy Store',
      description: 'Experience the convenience of our online pharmacy store...',
      link: '/pharmacy-store',  
    },
    {
      image: '/assets/noticard.png',
      title: 'Medicine Alarm',
      description: 'A Medical Alarm helps users set reminders for medication schedules...',
      link: '/medicine-alarm',  
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 -mt-10">
      <motion.h1
        className="text-4xl font-bold text-center monda mb-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Your Health is Our Priority
      </motion.h1>

 
      <div className="flex flex-col md:flex-row items-center justify-center gap-7 w-8/10">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            onClick={() => navigate(card.link)}  // Handle click
            className="bg-[#DCE9FF] shadow-lg rounded-lg overflow-hidden w-full md:w-1/2 transform transition-transform duration-300 h-110 cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.3)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <img src={card.image} alt={card.title} className="w-60 h-64 object-cover ml-40 pt-4" />
            <div className="p-4">
              <h2 className="text-4xl font-bold monda flex text-center gap-3 justify-center">
                {card.title} <FaArrowRight />
              </h2>
              <p className="text-gray-700 text-center mt-2 maven-pro text-left">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="h-40"></div>


<div className="w-full h-16 relative">
  <div className="absolute top-0 left-0 w-full h-8 bg-[#2733A0] rotate-355 flex items-center overflow-hidden">
    <motion.span
      className="text-white font-bold text-2xl whitespace-nowrap px-10"
      initial={{ x: "100%" }}
      animate={{ x: "-100%" }}
      transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
    >
      Track Medications Effortlessly &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Track Medications Effortlessly &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Track Medications Effortlessly
    </motion.span>
  </div>

  <div className="absolute top-0 left-0 w-full h-8 bg-[#2733A0] rotate-5 flex items-center overflow-hidden">
    <motion.span
      className="text-white font-bold text-2xl whitespace-nowrap px-10"
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
    >
      Your Wellness, Our Commitment! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Your Wellness, Our Commitment! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Your Wellness, Our Commitment!
    </motion.span>
  </div>
</div>
    </div>
  );
};

export default Services;
