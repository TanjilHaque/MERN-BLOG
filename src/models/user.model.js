const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      min: [5, "atleast use 5 characters"],
      max: [19, "atmost use 19 characters"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    lastLogin: {
      type: Date,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      max: [11, "must be 11 numbers"],
      min: [11, "must be 11 numbers"],
    },
    permanentAddress: {
      type: String,
      trim: true,
    },
    presentAddress: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("users", userSchema);
module.exports = { UserModel };
