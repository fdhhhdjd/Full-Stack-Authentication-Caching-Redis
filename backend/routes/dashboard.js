const route = require("express").Router();
const VerifyAcceptToken = require("../middlewares/VerifyToken.middleware");

route.get("/dashboard", VerifyAcceptToken, (req, res) => {
  return res.json({ status: true, message: "Hello from dashboard." });
});

module.exports = route;
