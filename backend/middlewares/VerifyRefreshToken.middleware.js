const REDIS = require("../configs/redis");
const { VerifyToken } = require("../utils/storage");
const VerifyRefreshToken = (req, res, next) => {
  const token = req.body.token;
  if (token === null)
    return res.status(401).json({ status: false, message: "Invalid request." });
  try {
    const decoded = VerifyToken(token);
    req.user = decoded;
    // verify if token is in store or not
    REDIS.get(decoded.sub.toString(), (err, data) => {
      if (err) throw err;

      if (data === null)
        return res.status(401).json({
          status: false,
          message: "Invalid request. Token is not in store.",
        });
      if (JSON.parse(data).token != token)
        return res.status(401).json({
          status: 401,
          message: "Invalid request. Token is not same in store.",
        });

      next();
    });
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: "Your session is not valid.",
    });
  }
};

module.exports = VerifyRefreshToken;
