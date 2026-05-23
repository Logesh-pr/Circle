import { Schema, model } from "mongoose";

const followSchema = Schema({
  follower: { type: Schema.Types.ObjectId, ref: "User", unique: true },
  following: { type: Schema.Types.ObjectId, ref: "User", unique: true },
});
