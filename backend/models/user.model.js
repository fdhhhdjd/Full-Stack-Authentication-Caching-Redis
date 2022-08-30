const { Schema, model } = require("mongoose");
const UserOtpSchema = new Schema(
  {
    userId: { type: String, required: true },
    email: String,
    username: String,
    password: {
      type: String,
      require: true,
    },
  },
  {
    collection: "userotp",
    timestamps: true,
  }
);

module.exports = {
  _Users: model("userotp", UserOtpSchema),
};
