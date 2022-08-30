const REDIS = require("../configs/redis");
const { createAccessToken, createRefreshToken } = require("../utils/storage");
module.exports = {
  GetAccessToken: ({ user_id }) => {
    const access_token = createAccessToken({ user_id });
    return access_token;
  },

  GenerateRefreshToken: ({ user_id }) => {
    const refresh_token = createRefreshToken(user_id);
    REDIS.get(user_id.toString(), (err, data) => {
      if (err) throw err;
      REDIS.set(user_id.toString(), JSON.stringify({ token: refresh_token }));
    });
    return refresh_token;
  },
};
