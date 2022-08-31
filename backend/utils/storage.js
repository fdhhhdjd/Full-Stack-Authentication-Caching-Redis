const OtpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CONSTANTS = require("../configs/constants");
const {
  ACCESS_TOKEN_SECRET,
  EXPIRES_ACCESS_TOKEN,
  REFRESH_TOKEN_SECRET,
  EXPIRES_REFRESH_TOKEN,
} = process.env;
module.exports = {
  /**
   * from String template to URI
   * @author Nguyen Tien Tai
   *
   * @param {string} template
   * @param {object} data
   *
   * @returns {string}
   */
  randomOTPOtp() {
    return OtpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
  },
  //*GenSalt Encryption
  async GeneralGenSaltEncryption(number) {
    return await bcrypt.genSalt(number);
  },
  //*Hash Encryption
  async GeneralHashEncryption(password, number) {
    return await bcrypt.hash(password, number);
  },
  //*Compare Encryption
  async GeneralCompareEncryption(password, hashCode) {
    return await bcrypt.compare(password, hashCode);
  },
  //* Status code
  reasonPhraseCodeProNewMap: () => {
    const result = new Map([
      ["100", CONSTANTS.STATUS_CODE_100],
      ["101", CONSTANTS.STATUS_CODE_101],
      ["102", CONSTANTS.STATUS_CODE_102],
      ["103", CONSTANTS.STATUS_CODE_103],
      ["200", CONSTANTS.STATUS_CODE_200],
      ["201", CONSTANTS.STATUS_CODE_201],
      ["202", CONSTANTS.STATUS_CODE_202],
      ["203", CONSTANTS.STATUS_CODE_203],
      ["204", CONSTANTS.STATUS_CODE_204],
      ["401", CONSTANTS.STATUS_CODE_401],
      ["404", CONSTANTS.STATUS_CODE_404],
      ["503", CONSTANTS.STATUS_CODE_503],
      ["default", CONSTANTS.STATUS_CODE_DEFAULT],
    ]);
    return result;
  },
  //* Check Status return
  returnReasons: (code) => {
    return reasonPhraseCodeProNewMap().get(code);
  },
  //* Accept Token
  createAccessToken({ user_id }) {
    return jwt.sign({ sub: user_id }, ACCESS_TOKEN_SECRET, {
      expiresIn: EXPIRES_ACCESS_TOKEN,
    });
  },
  //* Refresh Token
  createRefreshToken(user_id) {
    return jwt.sign({ sub: user_id }, REFRESH_TOKEN_SECRET, {
      expiresIn: EXPIRES_REFRESH_TOKEN,
    });
  },
  //* Verify RefreshToken
  VerifyToken(token) {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  },
  //* Verify AcceptToken
  VerifyAccToken(token) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  },
};
