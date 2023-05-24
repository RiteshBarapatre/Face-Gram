const express = require("express");
const router = express.Router();
const Posts = require("../model/post");
const User = require("../model/signup");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const Comment = require("../model/comment");
const Like = require("../model/like");
dotenv.config({});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.post("/photo", async (req, res) => {
  const { name, caption } = req.body;

  const userInfo = await User.findOne({ name });
  if (userInfo) {
    const photo = req.files.photo;

    cloudinary.uploader.upload(photo.tempFilePath, (err, result) => {
      newPost = new Posts({
        name: name,
        email: userInfo.email,
        caption: caption,
        photo: result.url,
        profilePic: userInfo.profilePic,
      });
      newPost
        .save()
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) =>
          res.status(400).json({ error: "Problem in posting Photo" })
        );
    });
  } else {
    res.status(400).send("Something Went Wrong");
  }
});

router.get("/allpost", async (req, res) => {
  const allPosts = await Posts.find({});
  res.status(200).send(allPosts);
});

router.get("/userposts/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const allUserPosts = await Posts.find({ email });
    res.status(200).send(allUserPosts);
  } catch (error) {
    res.status(400).json({ error: "Something is wrong" });
  }
});

router.post("/comment", async (req, res) => {
  const { post_id, comment, email, name, profilePic } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    try {
      var newComment = new Comment({
        post_id: post_id,
        comment: comment,
        email: email,
        name: name,
        profilePic: profilePic,
      });
      newComment
        .save()
        .then((response) => {
          res.send(response);
        })
        .catch((err) => {
          res.send(err);
        });
    } catch (error) {
      res.send(error);
    }
  }
});

router.get("/fetchcomments/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const allComments = await Comment.find({ post_id: postId });
    res.status(200).send(allComments);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/updatepost", async (req, res) => {
  const { postId, caption } = req.body;

  const photo = req.files.photo;

  cloudinary.uploader.upload(photo.tempFilePath, async (err, result) => {
    const updatedPostConfig = {
      caption: caption,
      photo: result.url,
    };
    const updatedPost = await Posts.findByIdAndUpdate(
      { _id: postId },
      updatedPostConfig
    );
    res.send(updatedPost);
  });
});

router.delete("/deletepost/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
  
    const deletePost = await Posts.findByIdAndDelete(postId);
    const likeDelete = await Like.findByIdAndDelete(postId)
    const commentDelete = await Comment.findByIdAndDelete(postId)
  
    res.status(200).send(deletePost);
  } catch (error) {
    res.status(400).send(error)
  }
});

router.post("/like", async (req, res) => {
  const { name, email, profilePic, postId } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    try {
      var newLike = new Like({
        name,
        email,
        profilePic,
        postId,
      });
      newLike
        .save()
        .then((response) => {
          res.send(response);
        })
        .catch((err) => {
          res.send(err);
        });
    } catch (error) {
      res.send(error);
    }
  }
});

router.get("/fetchlikes/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const allLikes = await Like.find({ postId });
    res.status(200).send(allLikes);
  } catch (error) {
    res.status(400).send("Failed to fetch likes");
  }
});

router.delete("/deletelikes",async (req,res)=>{
  const deletelikes = await Like.deleteMany({})
  res.send(deletelikes)
})

router.delete("/dislike/:email",async (req,res)=>{
  const {email} = req.params
  try {
    const dislike = await Like.findOneAndDelete({email})
    res.send(dislike)
  } catch (error) {
    res.status(400).send(error)
  }
})
module.exports = router;  
