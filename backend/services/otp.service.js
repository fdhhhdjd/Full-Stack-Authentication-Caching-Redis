"use strict";
const { _Otp } = require("../models/otp.model");
const {
  GeneralGenSaltEncryption,
  GeneralHashEncryption,
  GeneralCompareEncryption,
} = require("../utils/storage");
const CONSTANTS = require("../configs/constants");
module.exports = {
  validOtp: async ({ otp, hashOtp }) => {
    try {
      const invalidOtp = await GeneralCompareEncryption(otp, hashOtp);
      return invalidOtp;
    } catch (error) {
      return error;
    }
  },
  insertOtp: async ({ otp, email }) => {
    try {
      const salt = await GeneralGenSaltEncryption(CONSTANTS._HASH_KEY_OTP);
      const hashOtp = await GeneralHashEncryption(otp, salt);
      const Otp = await _Otp.create({
        email,
        otp: hashOtp,
      });
      return Otp ? 1 : 0;
    } catch (error) {
      return error;
    }
  },
};
