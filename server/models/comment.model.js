import { Schema, model } from "mongoose";

const commentSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    content: { type: String, max: 100, min: 2 },
  },
  { timestamps: true },
);

export default model("Comment", commentSchema);
