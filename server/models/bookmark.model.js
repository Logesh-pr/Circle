import { Schema, model } from "mongoose";

const bookmarkSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true },
);

bookmarkSchema.index({ user: 1, post: 1 }, { unique: true });

export default model("Bookmark", bookmarkSchema);
