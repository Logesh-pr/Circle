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
    password: { type: String, required: true, min: 6 },
    tokenVersion: { type: Number, default: 0 },
    bio: { type: String, Max: 30 },
    avator: { type: String },
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
    _id: this._id,
    username: this.username,
    email: this.email,
    isVerified: this.isVerified,
    createdAt: this.createAt,
  };
};

export default model("User", userSchema);
