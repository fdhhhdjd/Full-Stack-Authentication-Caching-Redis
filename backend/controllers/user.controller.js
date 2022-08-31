const { returnReasons } = require("../middlewares/HandleError");
const {
  CheckAccountRegister,
  VerifyOtp,
  UpdatePassword,
  CheckLogin,
  GetAccessToken,
  RemoveALL,
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
  //Login
  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const session = req.session;
      const { code, element } = await CheckLogin({
        email,
        password,
        session,
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
  GetProfile: async (req, res) => {
    console.log(req.session);
    res.send(req.session);
  },
  Logout: async (req, res) => {
    try {
      const user_id = req.user.sub;
      const token = req.token;
      const session = req.session;
      const { code, element } = await RemoveALL({
        user_id,
        token,
        session,
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
  GetAccessTokens: async (req, res) => {
    try {
      const user_id = req.user.sub;
      const { code, element } = await GetAccessToken({
        user_id,
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
