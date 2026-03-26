import { Schema, model } from "mongoose";

const likeSchema = Schema(
  {
    user: Schema.Types.ObjectId,
    post: Schema.Types.ObjectId,
  },
  { timestamps: true },
);

likeSchema.index({ user: 1, post: 1 }, { unique: true });

export default model("Like", likeSchema);
