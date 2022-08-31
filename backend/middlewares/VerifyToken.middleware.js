const REDIS = require("../configs/redis");
const { VerifyAccToken } = require("../utils/storage");
const VerifyAcceptToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decoded = VerifyAccToken(token);
    req.userData = decoded;

    req.token = token;

    // varify blacklisted access token.
    REDIS.get("BL_" + decoded.sub.toString(), (err, data) => {
      if (err) throw err;

      if (data === token)
        return res
          .status(401)
          .json({ status: false, message: "blacklisted token." });
      next();
    });
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Your session is not valid.",
      data: error,
    });
  }
};

module.exports = VerifyAcceptToken;
