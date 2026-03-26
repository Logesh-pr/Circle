import sharp from "sharp";
import cloudinary from "../config/cloudinary.js";

const uploadImage = async (file) => {
  const buffer = await sharp(file.buffer)
    .resize({ width: 1080 })
    .webp({ quality: 80 })
    .toBuffer();

  return new Promise((resolver, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "circle_posts" }, (err, result) => {
        if (err) return reject(err);

        resolver({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
        });
      })
      .end(buffer);
  });
};

export default uploadImage;
