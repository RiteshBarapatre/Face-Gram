const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    post_id: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Comment = new mongoose.model("comment", schema);

module.exports = Comment;
