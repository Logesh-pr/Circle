import { Schema, model } from "mongoose";

const followSchema = Schema({
  follower: { type: Schema.Types.ObjectId, ref: "User", unique: true },
  following: { type: Schema.Types.ObjectId, ref: "User", unique: true },
});

followSchema.index({ follower: 1, following: 1 }, { unique: true });

export default model("Follow", followSchema);
