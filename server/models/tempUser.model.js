import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const tempUserSchema = Schema({
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true, min: 6 },
  opt: { type: String },
  otpAttempts: { type: Number, default: 0 },
  otpExpires: { type: Date },
  resendAvailableAt: { type: Date },
  resendAttempta: { type: Number, default: 0 },
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
