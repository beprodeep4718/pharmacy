import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import 'react-vertical-timeline-component/style.min.css';

const timelineData = [
  {
    title: 'Manage Medications with Ease & One Click',
    description: 'Manage your medications effortlessly with our user-friendly platform. Enjoy seamless prescription handling, timely reminders, and secure storage for stress-free health management.',
   
    image: '/assets/click.png'
  },
  {
    title: 'Detailed Medication Info, Analog Options, and Reminders',
    description: 'Access detailed medication info, analog options, and timely reminders to stay on top of your health. Our platform keeps you informed and in control of your medication management.',
 
    image: '/assets/reminder.png'
  },
  {
    title: 'Health Tips and Resources',
    description: 'Stay informed with our expert health tips, articles, videos, and guides tailored to your needs. From diet and fitness to managing chronic conditions and mental wellness, we provide up-to-date, reliable resources to support your well-being',
    
    image: '/assets/hrtrate.png'
  },
  {
    title: 'Customer Testimonials',
    description: 'Discover how our platform has helped customers manage their health with ease through timely reminders and secure prescription handling. Their stories highlight the convenience and reliability we offer. Join them and experience the difference for yourself!',
    image: '/assets/testi.png'
  }
];

const TimelineCard = ({ item }) => (
  <VerticalTimelineElement
    contentStyle={{ background: '#DCE9FF', color: 'black', display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
    width:'550px'
    }}
    contentArrowStyle={{ borderRight: '7px solid #232631' }}
    iconStyle={{ display: 'none' }}
  >
    <div className="flex-1 pr-6">
      <h3 className="text-black text-[20px] monda font-bold">{item.title}</h3>
      <p className="text-white-100 text-[14px] maven-pro mt-2">{item.description}</p>
    </div>
    <div className="flex-shrink-0">
      <img src={item.image} alt={item.title} className="w-full h-42 object-cover rounded-md" />
    </div>
  </VerticalTimelineElement>
);

const Advantages = () => {
  return (
    <div className="p-6">
      <motion.div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-black">Advantages</h2>
      </motion.div>
      <VerticalTimeline lineColor="black" >
        {timelineData.map((item, index) => (
          <TimelineCard key={index} item={item} />
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Advantages;
