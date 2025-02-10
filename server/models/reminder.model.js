const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
  {
    medicineName: {
      type: String,
      required: true,
    },
    times: [
      {
        type: String,
        required: true,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "specific_days"],
      required: true,
      default: "daily",
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Reminder", reminderSchema);