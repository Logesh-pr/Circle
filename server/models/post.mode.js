import { Schema, model } from "mongoose";

const postSchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, max: 300 },
});
