const express = require("express");
const { loginUser, registerUser } = require("../controller/auth-controller");
const { validateLogin, validateRegister } = require("../middleware/validators");

const router = express.Router();

router.post("/register",validateRegister,registerUser);


router.post("/login", validateLogin, loginUser);

module.exports = router;