const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    profilePic: {
      type: String,
    },
  },
  { timestamp: true }
);
const Posts = new mongoose.model("posts", schema);

module.exports = Posts;
