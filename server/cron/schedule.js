const cron = require("node-cron");

const reminderModel = require("../models/reminder.model");

cron.schedule("* * * * * *", async () => {
    const date = new Date();
    const currentHour = date.getHours();
    const currentMinute = date.getMinutes();
    const currentSec = date.getSeconds();
    const currentTime = `${currentHour}:${currentMinute}:${currentSec}`;
    console.log(currentTime)
});

module.exports = cron;