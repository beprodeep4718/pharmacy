const router = require("express").Router();

const reminderController = require("../controllers/reminder.controller");
const authMiddleware = require("../middleware/authmiddleware");

router.post("/create", authMiddleware, reminderController.create);
router.get("/getAll", authMiddleware, reminderController.getAll);
router.delete("/delete/:id", authMiddleware, reminderController.delete);


module.exports = router;