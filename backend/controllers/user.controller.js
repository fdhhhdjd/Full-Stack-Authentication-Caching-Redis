const { returnReasons } = require("../middlewares/HandleError");
const {
  CheckAccountRegister,
  VerifyOtp,
  UpdatePassword,
} = require("../services/user.services");

const UserCtl = {
  Register: async (req, res) => {
    try {
      const { email } = req.body;
      const { code, element } = await CheckAccountRegister({
        email,
      });
      return res.status(code).json({
        code,
        message: returnReasons(code.toString()),
        element,
      });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        message: returnReasons("503"),
      });
    }
  },
  VerifyOtpRegister: async (req, res) => {
    try {
      const { email, otp } = req.body;
      const { code, element } = await VerifyOtp({
        email,
        otp,
      });
      return res
        .status(code)
        .json({ code, message: returnReasons(code.toString()), element });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        message: returnReasons("503"),
      });
    }
  },
  UpdatePassword: async (req, res) => {
    try {
      const { password } = req.body;
      const id = req.params.id;
      const { code, element } = await UpdatePassword({
        id,
        password,
      });
      return res.status(code).json({
        code,
        message: returnReasons(code.toString()),
        element,
      });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        message: returnReasons("503"),
      });
    }
  },
};
module.exports = UserCtl;
