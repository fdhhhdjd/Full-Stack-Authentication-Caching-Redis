const OtpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const CONSTANTS = require("../configs/constants");
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
};
