import sharp from "sharp";
import cloudinary from "../config/cloudinary.js";

const uploadImage = async (file) => {
  const metadata = await sharp(file.buffer).metadata();
  const inputWidth = metadata.width;
  const inputHeight = metadata.height;
  const inputRatio = inputWidth / inputHeight;
  const TARGET_WIDTH = 1080;
  const MIN_RATIO = 4 / 5;
  const MAX_RATIO = 1.91;
  let finalWidth = TARGET_WIDTH;
  let finalHeight;
  if (inputRatio < MIN_RATIO) {
    // Too tall → crop to 4:5
    finalHeight = Math.round(TARGET_WIDTH / MIN_RATIO); // 1350
  } else if (inputRatio > MAX_RATIO) {
    // Too wide → crop to 1.91:1
    finalHeight = Math.round(TARGET_WIDTH / MAX_RATIO); // 566
  } else {
    // Within range → keep original ratio
    finalHeight = Math.round(TARGET_WIDTH / inputRatio);
  }
  const buffer = await sharp(file.buffer)
    .rotate()
    .resize({
      width: finalWidth,
      height: finalHeight,
      fit: "inside",
      position: "center",
    })
    .webp({ quality: 80 })
    .toBuffer();

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "circle_posts" }, (err, result) => {
        if (err) return reject(err);

        resolve({
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
