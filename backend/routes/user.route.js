const userCtl = require("../controllers/user.controller");
const router = require("express").Router();
//Register
router.post("/register", userCtl.Register);

//VerifyOtp
router.post("/otp", userCtl.VerifyOtpRegister);

//Update password
router.patch("/password/:id", userCtl.UpdatePassword);

module.exports = router;
