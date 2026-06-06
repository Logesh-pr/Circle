import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const tempUserSchema = Schema({
  name: { type: String, require: true, min: 4, max: 10, trim: true },
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true, min: 6 },
  otp: { type: String },
  otpExpires: { type: Date },
  resendAvailableAt: { type: Date },
  resendAttempts: { type: Number, default: 0 },
  otpAttempts: { type: Number, default: 0 },
  maxOTPAttempts: { type: Number, default: 3 },
  maxResendOTPAttempts: { type: Number, default: 3 },
  status: {
    type: String,
    enum: ["pending_otp", "pending_username"],
    default: "pending_otp",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600,
  },
});

tempUserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcryptjs.hash(this.password, 12);
});

export default model("TempUser", tempUserSchema);
