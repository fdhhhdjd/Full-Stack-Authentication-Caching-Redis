const { _Otp } = require("../models/otp.model");
const { _Users } = require("../models/user.model");
const { validateEmail, isPassword, randomString } = require("../utils/helper");
const {
  randomOTPOtp,
  GeneralHashEncryption,
  GeneralCompareEncryption,
} = require("../utils/storage");
const { insertOtp, validOtp } = require("./otp.service");
const CONSTANTS = require("../configs/constants");
const { NodeMailers } = require("./sendEmail");
const { GetAccessToken, GenerateRefreshToken } = require("./Token.service.js");
module.exports = {
  //Register
  CheckAccountRegister: async ({ email }) => {
    const user = await _Users.findOne({ email: email });
    const Email = validateEmail(email);
    if (user && !Email) {
      return {
        code: 404,
      };
    }
    const OTP = randomOTPOtp();
    await NodeMailers(email, OTP);
    return {
      code: 200,
      element: await insertOtp({
        otp: OTP,
        email,
      }),
    };
  },
  //VerifyOtp
  VerifyOtp: async ({ email, otp }) => {
    try {
      const otpHolder = await _Otp.find({
        email,
      });
      if (!otpHolder.length)
        return {
          code: 404,
        };

      const lastOtp = otpHolder[otpHolder.length - 1];
      const isValid = await validOtp({
        otp,
        hashOtp: lastOtp.otp,
      });
      if (!isValid)
        return {
          code: 401,
        };
      if (isValid && email === lastOtp.email) {
        const Key_id = randomString(CONSTANTS._KEY_RANDOM_STRING);

        const user = await _Users.create({
          userId: Key_id,
          email,
          username: "tai dep trai",
        });
        if (user) {
          await _Otp.deleteMany({
            email,
          });
        }
        return {
          code: 201,
          element: user,
        };
      }
    } catch (error) {
      return {
        code: 503,
      };
    }
  },
  UpdatePassword: async ({ id, password }) => {
    try {
      const Users = await _Users.findById(id);
      const Password = isPassword(password);

      if (!Users && !Password) {
        return {
          code: 404,
        };
      }
      const Hash = await GeneralHashEncryption(
        password,
        CONSTANTS._HASH_KEY_PASSWORD
      );
      const user = await _Users.findOneAndUpdate(
        { _id: id },
        {
          password: Hash,
        }
      );
      return {
        code: 201,
        element: user,
      };
    } catch (error) {
      return {
        code: 503,
      };
    }
  },
  CheckLogin: async ({ email, password, session }) => {
    try {
      const user = await _Users.findOne({ email: email }).exec();
      const passwords = await GeneralCompareEncryption(password, user.password);
      //Save Session
      session.user = user;

      if (!user) {
        return {
          code: 404,
        };
      }
      if (!passwords) {
        return {
          code: 401,
        };
      }
      const accessToken = GetAccessToken({ user_id: user._id });
      const refreshToken = GenerateRefreshToken({ user_id: user._id });
      return {
        code: 200,
        element: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        code: 503,
      };
    }
  },
};
