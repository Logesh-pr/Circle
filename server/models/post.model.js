import { Schema, model } from "mongoose";
import slugify from "slugify";

const postSchema = Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, max: 2000 },
    images: [{ url: String, publicId: String, width: Number, heidht: Number }],
    slug: { type: String, unique: true },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

postSchema.pre("save", async function () {
  if (!this.slug) {
    this.slug =
      slugify(this.content?.slice(0, 50) || "post") + "-" + Date.now();
  }
});

export default model("Post", postSchema);
