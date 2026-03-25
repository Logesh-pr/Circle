import { Schema, model } from "mongoose";

const sessionSchema = Schema({
  userId: { type: String },
  refreshToken: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default model("Session", sessionSchema);
