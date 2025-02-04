import React from 'react'

const Hero = () => {
  return (
    <div className=" relative z-10 flex flex-col h-[calc(100vh-70px)] md:flex-row items-center justify-between  px-16  bg-gradient-to-r from-blue-900 to-blue-500 my-18">

<div className="text-white max-w-lg">
  <p className="text-[42px]/14 font-bold monda text-white spacing-loose ">Optimize Your Health  <span className='whitespace-nowrap'>Care: Seamless Medication</span>  Ordering, Management, 
and Reminders in 
One Place!</p>
  <p className="text-lg mb-6 pt-6 maven-pro text-white">[website name] provides seamless medication ordering, comprehensive prescription management, and timely reminders—all in one secure, user-friendly platform.</p>
  <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 ml-30">Get Started</button>
</div>

{/* Right Side Image */}
<div className="mt-10 md:mt-0 ml-20">
  <img src="/assets/herobg.png"  alt="Landing Illustration" className="  w-[659px]  h-[626px]" />
</div>
</div>
  )
}

export default Hero
