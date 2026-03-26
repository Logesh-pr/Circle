//utils
import AppError from "../utils/AppError.js";
import uploadImage from "../utils/uploadImage.js";
import catchAsync from "../utils/catchAsync.js";

//models
import Post from "../models/post.model.js";
import Like from "../models/like.model.js";

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

  if (files.length > 4) {
    return next(new AppError("max 4 are allowed", 400));
  }

  const uploadedImages = [];

  for (let file of files) {
    const img = await uploadImage(file);
    uploadedImages.push(img);
  }

  const post = await Post.create({
    author: req.user._id,
    content,
    images: uploadedImages,
  });

  return res.json(200).json({ status: 200, message: "Post created" });
});

export const like = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.user._id;

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

  await Like.create({ user: userId, post: postId });
  await Post.findByIdAndUpdate(postId, {
    $inc: { likesCount: 1 },
  });

  return res.status(200).json({ status: 200, message: "liked successfully" });
});
