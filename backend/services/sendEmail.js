const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const {
  GOOGLE_CLIENT_IDS,
  GOOGLE_CLIENT_SECRETS,
  GOOGLE_URL,
  GOOGLE_REFRESH_TOKEN,
  NAME_EMAIL_FROM,
} = process.env;
const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_IDS,
  GOOGLE_CLIENT_SECRETS,
  GOOGLE_URL
);
oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
module.exports = {
  NodeMailers: async (email, OTP) => {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "oAuth2",
          user: NAME_EMAIL_FROM,
          clientId: GOOGLE_CLIENT_IDS,
          clientSecret: GOOGLE_CLIENT_SECRETS,
          refreshToken: GOOGLE_REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      //Option event
      let info = await transport.sendMail({
        from: `"Tài Heo Dev 🐷" ${NAME_EMAIL_FROM}`,
        to: email,
        subject: "Key Phone Number 📴",
        text: "Hello world?",
        html: `<p>Thank For,Key Phone number --- <b>${OTP}</b> --- 💖</p>`,
      });
      return info;
    } catch (error) {
      return error;
    }
  },
};
