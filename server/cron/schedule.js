require("dotenv").config();
const cron = require("node-cron");
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const reminderModel = require("../models/reminder.model");
const User = require("../models/user.model");

cron.schedule("* * * * *", async () => {
    const date = new Date();
    const currentHour = date.getHours();
    const currentMinute = date.getMinutes();
    const currentTime = `${currentHour}:${currentMinute}`;
    const reminders = await reminderModel.find({ time: currentTime });
    reminders.forEach(async (reminder) => {
        const user = await User.findById(reminder.user);
        await client.messages.create({
            body: `Reminder: Take your medicine - ${reminder.medicineName}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+91${user.phone}`,
        });
    });
});

module.exports = cron;