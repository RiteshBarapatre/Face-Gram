const express = require("express");
const router = express.Router();
const User = require("../model/signup");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config({});
var bcrypt = require("bcryptjs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.post("/login", async (req, res) => {
  const { emailOrUserName, password } = req.body;

  const emailUser = await User.findOne({ email: emailOrUserName });
  const userName = await User.findOne({ name: emailOrUserName });

  if (emailUser) {
    bcrypt.compare(password, emailUser.password, function (err, response) {
      if (response === true) {
        res.status(200).send(emailUser);
      } else {
        res.status(400).json({ error: "Wrong Credentials" });
      }
    });
  } else if (userName) {
    bcrypt.compare(password, userName.password, function (err, response) {
      if (response === true) {
        res.status(200).send(userName);
      } else {
        res.status(400).json({ error: "Wrong Credentials" });
      }
    });
  } else {
    res.status(400).json({ error: "User with this email or UserName doesn't exists" });
  }
});

router.delete("/", async (req, res) => {
  const deleteAll = await User.deleteMany({});
  res.send("AllUsers Deleted...");
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      const existuser = await User.findOne({ email });
      const userNameExist = await User.findOne({ name });
      if (existuser) {
        return res.status(400).json({ error: "Email already Register" });
      } else if (userNameExist) {
        return res.status(400).json({ error: "UserName already Exist" });
      } else {
        const profile = req.files.avatar;

        cloudinary.uploader.upload(profile.tempFilePath, (err, result) => {
          newUser = new User({
            name: name,
            email: email,
            password: hash,
            profilePic: result.url,
          });
          newUser
            .save()
            .then((result) => {
              res.status(200).send(result);
            })
            .catch((err) =>
              res.status(400).json({ error: "User not created" })
            );
        });
      }
    });
  });
});

module.exports = router;
