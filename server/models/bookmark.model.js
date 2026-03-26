import { Schema, model } from "mongoose";

const bookmarkSchema = Schema(
  {
    user: Schema.Types.ObjectId,
    post: Schema.Types.ObjectId,
  },
  { timestamps: true },
);

bookmarkSchema.index({ user: 1, post: 1 }, { unique: true });

export default model("Bookmark", bookmarkSchema);
