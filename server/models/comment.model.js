import { Schema, model } from "mongoose";

const commentSchema = Schema(
  {
    user: Schema.Types.ObjectId,
    post: Schema.Types.ObjectId,
    content: { type: String, max: 100, min: 2 },
  },
  { timestamps: true },
);

export default model("Comment", commentSchema);
