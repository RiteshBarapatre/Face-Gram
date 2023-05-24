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
    profilePic: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);
const Like = new mongoose.model("like", schema);

module.exports = Like;
