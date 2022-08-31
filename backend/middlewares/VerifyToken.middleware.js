const REDIS = require("../configs/redis");
const { VerifyAccToken } = require("../utils/storage");
const { returnReasons } = require("./HandleError");
const VerifyAcceptToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = VerifyAccToken(token);
    req.user = decoded;

    req.token = token;

    REDIS.get("BL_" + decoded.sub.toString(), (err, data) => {
      if (err) throw err;

      if (data === token)
        return res
          .status(401)
          .json({ status: false, message: "blacklisted token." });
      next();
    });
  } catch (error) {
    return res.status(503).json({
      status: 503,
      message: returnReasons("503"),
    });
  }
};

module.exports = VerifyAcceptToken;
