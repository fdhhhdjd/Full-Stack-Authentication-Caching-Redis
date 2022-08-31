const route = require("express").Router();
const VerifyToken = require("../middlewares/VerifyToken.middleware");

route.get("/dashboard", VerifyToken, (req, res) => {
  return res.json({ status: true, message: "Hello from dashboard." });
});

module.exports = route;
