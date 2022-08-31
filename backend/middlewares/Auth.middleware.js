const jwt = require("jsonwebtoken");

const AuthMiddleWare = (req, res, next) => {
  try {
  } catch (err) {
    return res.status(400).json({
      status: 400,
      msg: err.message,
    });
  }
};

module.exports = AuthMiddleWare;
