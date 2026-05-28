import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      min: 5,
      max: 15,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
    },
    followersCounts: { type: Number, default: 0 },
    followingCounts: { type: Number, default: 0 },
    password: { type: String, required: true, min: 6 },
    tokenVersion: { type: Number, default: 0 },
    bio: { type: String, Max: 30 },
    avator: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    authType: { type: String, enum: ["credentials", "google"] },
    createAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  { timeStamps: true },
);

// userSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;
//   this.password = await bcryptjs.hash(this.password, 12);
// });

userSchema.methods.comparePassword = async function (userPassword) {
  try {
    return await bcryptjs.compare(userPassword, this.password);
  } catch (error) {
    return false;
  }
};

userSchema.methods.toSafeObject = function () {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    avator: this.avator,
    bio: this.bio,
    followersCounts: this.followersCounts,
    followingCounts: this.followingCounts,
  };
};

userSchema.index({ username: "text" });
userSchema.index({ username: 1 });

export default model("User", userSchema);
