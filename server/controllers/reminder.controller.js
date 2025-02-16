const reminderModel = require("../models/reminder.model");
const User = require("../models/user.model");

module.exports.create = async (req, res) => {
  try {
    const reminder = new reminderModel({
      medicineName: req.body.medicineName,
      times: req.body.times,
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

module.exports.getAll = async (req, res) => {
  try {
    const reminders = await reminderModel.find({ user: req.user.id });
    res.status(200).json({ reminders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const reminder = await reminderModel.findByIdAndDelete(req.params.id);
    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    const user = await User.findById(req.user.id);
    user.reminder.pull(reminder._id);
    await user.save();

    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
