import { validationResult } from "express-validator";

//utils
import AppError from "../utils/AppError.js";
import uploadImage from "../utils/uploadImage.js";
import catchAsync from "../utils/catchAsync.js";

//models
import Post from "../models/post.model.js";
import Like from "../models/like.model.js";
import Comment from "../models/comment.model.js";
import Bookmark from "../models/bookmark.model.js";

export const getAllPost = catchAsync(async (req, res, next) => {
  const posts = await Post.find().populate("author", "username");
  console.log(posts);
  if (!posts) {
    return next(new AppError("No post yet", 410));
  }

  const userId = req.user;
  console.log("user", userId);

  const postIds = posts.map((post) => post._id);

  const userLikes = await Like.find({ user: userId, post: { $in: postIds } });
  console.log("like", userLikes);

  const likedPostIds = new Set(userLikes?.map((like) => like.post.toString()));

  const postWithLikes = posts.map((post) => {
    const postObject = post.toObject();
    return {
      ...postObject,
      isLiked: likedPostIds?.has(post._id.toString()),
    };
  });

  res.status(200).json({
    status: 200,
    message: "Sucessfully fetched all post",
    data: postWithLikes,
  });
});

export const createPost = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new AppError(
        errors
          .array()
          .map((err) => err.msg)
          .join(", "),
        400,
      ),
    );
  }

  const { content } = req.body;
  const files = req.files || [];
  console.log("file:", files);

  if (files.length > 4) {
    return next(new AppError("max 4 are allowed", 400));
  }

  const uploadedImages = [];

  for (let file of files) {
    const img = await uploadImage(file);
    uploadedImages.push(img);
  }
  console.log(content);
  const post = await Post.create({
    author: req.user,
    content,
    images: uploadedImages,
  });

  if (post || uploadedImages) {
    return res.status(200).json({ status: 200, message: "Post created" });
  }

  return next(new AppError("something went wrong, Try again later", 400));
});

export const like = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.user;
  console.log("like");

  const existing = await Like.findOne({ user: userId, post: postId });

  if (existing) {
    await existing.deleteOne();

    await Post.findByIdAndUpdate(postId, {
      $inc: { likesCount: -1 },
    });

    return res
      .status(200)
      .json({ status: 200, message: "unlike successfully" });
  }

  const likePost = await Like.create({ user: userId, post: postId });

  const likePostCount = await Post.findByIdAndUpdate(postId, {
    $inc: { likesCount: 1 },
  });

  if (likePost && likePostCount) {
    return res.status(200).json({ status: 200, message: "liked successfully" });
  }

  return next(new AppError("something went wrong, Try again later", 400));
});

export const comment = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new AppError(
        errors
          .array()
          .map((err) => err.msg)
          .join(", "),
        400,
      ),
    );
  }
  const { postId } = req.params;
  const { content } = req.body;

  const commentPost = await Comment.create({
    user: req.user,
    post: postId,
    content,
  });

  const commentPostCount = await Post.findByIdAndUpdate(postId, {
    $inc: { commentsCount: 1 },
  });

  if (commentPost && commentPostCount) {
    return res
      .status(200)
      .json({ status: 200, message: "Succfully commented" });
  }

  return next(new AppError("something went wrong, Try again later", 400));
});

export const bookmark = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  const bookmarkPost = await Bookmark.create({
    user: req.user,
    post: postId,
  });

  const bookmarkCount = await Post.findByIdAndUpdate(postId, {
    $inc: { bookmarkCount: 1 },
  });

  if (bookmarkPost && bookmarkCount) {
    return res
      .status(200)
      .json({ status: 200, message: "Successfully bookmarked" });
  }

  return next(new AppError("Something went wrong, Try again later", 400));
});
