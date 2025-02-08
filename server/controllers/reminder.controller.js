const reminderModel = require("../models/reminder.model");
const User = require("../models/user.model");

module.exports.create = async (req, res) => {
  try {
    const reminder = new reminderModel({
      medicineName: req.body.medicineName,
      time: req.body.time,
      user: req.user.id,
      frequency: req.body.frequency,
    });

    await reminder.save();

    const user = await User.findById(req.user.id);
    user.reminder.push(reminder._id);
    await user.save();

    res.status(201).json({ reminder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
