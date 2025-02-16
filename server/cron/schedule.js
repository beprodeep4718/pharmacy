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
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    const currentTime = `${hours}:${strMinutes} ${ampm}`;
    const reminders = await reminderModel.find({ times: { $in: [currentTime] } });
    reminders.forEach(async (reminder) => {
        const user = await User.findById(reminder.user);
        console.log("sending msg");
        await client.messages.create({
            body: `Reminder: Take your medicine - ${reminder.medicineName}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `${user.phone}`,
        });
    });
});

module.exports = cron;