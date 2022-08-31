const userCtl = require("../controllers/user.controller");
const router = require("express").Router();
const VerifyRefreshToken = require("../middlewares/VerifyRefreshToken.middleware");
const VerifyAcceptToken = require("../middlewares/VerifyToken.middleware");
//Register
router.post("/register", userCtl.Register);

//VerifyOtp
router.post("/otp", userCtl.VerifyOtpRegister);

//Update password
router.patch("/password/:id", userCtl.UpdatePassword);

//Login
router.post("/login", userCtl.Login);

//Profile
router.get("/profile", VerifyAcceptToken, userCtl.GetProfile);

//Logout
router.get("/logout", VerifyAcceptToken, userCtl.Logout);

//Get AccessToken
router.get("/token", VerifyRefreshToken, userCtl.GetAccessTokens);

module.exports = router;
