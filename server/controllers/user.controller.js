import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

//model
import User from "../models/user.model.js";
import Follow from "../models/follow.model.js";

export const getUserProfile = catchAsync(async (req, res, next) => {
  const userId = req.user;
  const { username } = req.params;

  const user = await User.findOne({ username });

  if (!user) {
    next(new AppError("There is no user in this username", 404));
  }

  const isOwnProfile = user._id.toString() === userId.toString();

  const isFollowing = isOwnProfile
    ? false
    : !!(await Follow.findOne({ follower: userId, following: user._id }));

  return res.status(200).json({
    message: "success",
    data: { ...user.toSafeObject(), isOwnProfile, isFollowing },
  });
});

export const searchUsers = catchAsync(async (req, res, next) => {
  const { q } = req.query;

  if (!q || q.trim().length < 0) {
    return res.status(200).json({ status: "success", data: [] });
  }

  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const users = await User.find({
    username: { $regex: `^${escaped}`, $options: "i" },
    _id: { $ne: req.user },
  })
    .select("username avator")
    .limit(20)
    .lean();

  res.status(200).json({ message: "Successfully fetched users", data: users });
});

export const followUser = catchAsync(async (req, res, next) => {
  const { username } = req.params;
  const userId = req.user;
  console.log(username);

  const user = await User.findOne({ username });

  if (userId === user._id) {
    return next(new AppError("You cannot follow yourself", 400));
  }

  if (!username || !user) {
    return next(new AppError("No username found", 404));
  }

  const existing = await Follow.findOne({
    follower: userId,
    following: user._id,
  });

  console.log(existing);
  if (existing) {
    await existing.deleteOne();
    await User.findByIdAndUpdate(user._id, { $inc: { follower: -1 } });
    await User.findByIdAndUpdate(userId, { $inc: { following: -1 } });
    return res
      .status(200)
      .json({ status: "success", message: "Successfully unfollowed" });
  }

  await Follow.create({ follower: userId, following: user._id });
  await User.findByIdAndUpdate(user._id, { $inc: { follower: 1 } });
  await User.findByIdAndUpdate(userId, { $inc: { following: 1 } });
  return res
    .status(200)
    .json({ status: "success", message: "Successfully followed" });
});

// export const getUserProfile = catchAsync(async (req, res, next) => {
//   const userId = req.user;
//   const { username } = req.params;

//   const user = await User.findOne({ username });

//   if (userId === user._id) {
//     return next(new AppError("You can not "));
//   }
// });
