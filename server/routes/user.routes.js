const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authmiddleware");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/userinfo", authMiddleware, userController.userinfo);
router.post("/logout", userController.logout);
router.post("/add-to-cart", authMiddleware,  userController.addToCart);
router.get("/cart/:userId",authMiddleware,  userController.getCart);

module.exports = router;
