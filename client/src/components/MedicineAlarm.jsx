import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const MedicineAlarm = () => {
  const [medicineName, setMedicineName] = useState("");
  const [times, setTimes] = useState([""]);
  const [frequency, setFrequency] = useState("daily");
  const [reminders, setReminders] = useState([]);
  console.log(times);

  const fetchReminders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/reminder/getAll`,
        { withCredentials: true }
      );
      console.log("Reminders:", response.data);
      setReminders(response.data.reminders);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  }

  useEffect(() => {
    fetchReminders();
  }, [])

  const handleTimeChange = (index, value) => {
    const newTimes = [...times];
    newTimes[index] = value;
    setTimes(newTimes);
  };

  const addTimeField = () => {
    setTimes([...times, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", { medicineName, times, frequency });
    const formattedTimes = times.map((time) => {
      let [hours, minutes] = time.split(":").map(Number);
      let period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert 0 to 12 (midnight), 12 remains 12 (noon)
      return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
    });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/reminder/create`,
        {
          medicineName,
          times: formattedTimes,
          frequency,
        },
        { withCredentials: true }
      );
      console.log("Reminder saved:", response.data);
      setMedicineName("");
      setTimes([""]);
      setFrequency("daily");
      fetchReminders();
    } catch (error) {
      console.error("Error saving reminder:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="part1 w-1/2 h-full flex flex-col items-center justify-center overflow-hidden p-5">
          <h1 className="text-xl font-bold text-center">
            Medicine Reminders
          </h1>
            <h2 className="text-lg text-center">Your Reminders</h2>
          <ul className="reminders w-full max-h-[400px] overflow-y-auto px-4 flex flex-col items-center">
            {reminders.map((reminder, index) => (
              <li key={index} className="bg-[#BBE3FF] p-6 mb-2 rounded-xl shadow-md w-lg">
                <h1 className="text-xl font-semibold mb-5">{reminder.medicineName}</h1>
                {reminder.times.map((time, idx) => (
                  <span key={idx} className="bg-[#D2E5F0] py-2 px-4 font-medium rounded-full">{time}</span>
                ))}
              </li>
            ))}
          </ul>
        </div>
        <div className="part2 w-1/2 h-full flex flex-col justify-center items-center">
          <h1 className="text-xl font-semibold">Medicine Alarm</h1>
          <p className="mb-5">Set your medicine alarm here</p>
          <form
            onSubmit={handleSubmit}
            className="p-4 border-[2px] border-[#7AC3FF] rounded-xl shadow-md min-w-md mx-auto"
          >
            <label className="block mb-2 text-lg font-semibold">
              Medicine Name:
            </label>
            <input
              type="text"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              className="w-full p-2 py-4 border-none rounded-md bg-[#D2E5F0] placeholder:text-[#797979] mb-4"
              required
              placeholder="Enter Medicine Name"
            />

            <label className="block mb-2 text-lg font-semibold">
              Reminder Times:
            </label>
            {times.map((time, index) => (
              <input
                key={index}
                type="time"
                value={time}
                onChange={(e) => handleTimeChange(index, e.target.value)}
                className="w-full p-2 py-4 border-none rounded-md bg-[#D2E5F0] placeholder:text-[#797979] mb-2"
                required
              />
            ))}

            <button
              type="button"
              onClick={addTimeField}
              className="bg-[#0098D4] text-white px-4 py-2 w-full rounded-full mb-4 mr-4"
            >
              Add Time
            </button>

            <label className="block mb-2 text-lg font-semibold">
              Frequency:
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full p-2 border-none rounded-md bg-[#D2E5F0] placeholder:text-[#797979] mb-4"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="specific_days">Specific Days</option>
            </select>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 w-full  rounded-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MedicineAlarm;
