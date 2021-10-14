const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [50, "Name cannot be more than 50 characters long"],
  },
  email: {
    type: String,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    minLength: [6, "Password cannot be less than 6 character long."],
  },
});

//Hash password
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
});
module.exports = new mongoose.model("user", userSchema);