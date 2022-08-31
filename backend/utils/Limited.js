"use strict";
const REDIS = require("../configs/redis");
const del = async (key) => {
  return REDIS.del(key);
};
const set = async (key, value) => {
  return REDIS.set(key, value);
};
module.exports = { del, set };
