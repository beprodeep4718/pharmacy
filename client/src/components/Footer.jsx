
const Footer = () => {
  return (
    <>
      <div className="relative w-full h-[36vw] bg-cover bg-no-repeat bg-top bg-[url('/assets/footerbg.jpg')]">
        <div className="absolute inset-0 flex items-end justify-center text-center font-bold text-[2vw] font-monda text-white bg-gradient-to-b from-[#2974B2D4] to-[#11324CD4] p-[2vw]">
          Dedicated to precision, care, and your overall <br /> well-being and satisfaction
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[4vw] w-full p-[3vw_4vw_2vw_4vw] bg-[#11324C] text-[#8F8F8F] font-medium">
        <div className="font-['Maven_Pro']">
          <h2 className="font-['Monda'] font-bold text-[1.2vw] mb-[1.5vw] text-[#4DD0E1]">About Us</h2>
          Our mission is to revolutionize medication <br/> management through a secure, user-friendly <br/> online platform. We offer comprehensive <br/> information and personalized support, tailored schedules, and timely reminders. We ensure the <br/> highest privacy standards for personal health <br/> data. Our goal is to enhance well-being and <br/> promote healthier lifestyles worldwide.
        </div>
        <div>
          <h2 className="font-['Monda'] font-bold text-[1.2vw] mb-[1.5vw] text-[#4DD0E1]">Our Team</h2>
          <div className="flex">
            <div className="flex flex-col">
              <img className="rounded-full w-[4vw] mb-[1vw]" src="assets/Beprodeep.jpg" alt="Beprodeep Das" />
              <img className="rounded-full w-[4vw] mb-[1vw]" src="assets/Nirman.jpg" alt="Nirman Dey" />
              <img className="rounded-full w-[4vw]" src="assets/Sanglap.jpg" alt="Sanglap Halder" />
            </div>
            <div className="flex flex-col gap-[2vw] pl-[1vw]">
              <div className="name">Beprodeep Das <span className="text-grey-800">(full-stack developer) </span><br/> [codingbtech@gmail.com]</div>
              <div className="name">Nirman Dey <span className="text-grey-800">(full-stack developer) </span> <br/> [nirmandey23@gmail.com]</div>
              <div className="name">Sanglap Halder <span className="text-grey-800">(front-end & UI/UX)</span> <br/> [sanglaphalder1@gmail.com]</div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <h2 className="font-['Monda'] font-bold text-[1.2vw] mb-[1.5vw] text-[#4DD0E1]">Support</h2>
          We are Here to Help – Contact Us Anytime
          <div className="flex items-center justify-center mt-[2vw]">
            <input className="bg-[#081A26] h-[3.6rem] p-[1vw] rounded-l-md w-[80%] font-medium" type="text" id="message" name="message" placeholder="Your Message" />
            <button className="h-[3.8rem] w-[3.8rem] bg-[#4DD0E1] rounded-md" type="submit">
              <img src="assets/send.png" alt="Send" />
            </button>
          </div>
          <div className="text-right text-[#C3C3C3] font-medium mt-[3rem]">
          <br/><br/>All rights reserved &nbsp;&nbsp;
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;