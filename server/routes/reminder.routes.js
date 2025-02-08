const router = require("express").Router();

const reminderController = require("../controllers/reminder.controller");
const authMiddleware = require("../middleware/authmiddleware");

router.post("/create", authMiddleware, reminderController.create);


module.exports = router;