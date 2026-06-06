import { Schema, model } from "mongoose";

const followSchema = Schema({
  follower: { type: Schema.Types.ObjectId, ref: "User" },
  following: { type: Schema.Types.ObjectId, ref: "User" },
});

followSchema.index({ follower: 1, following: 1 }, { unique: true });

export default model("Follow", followSchema);
