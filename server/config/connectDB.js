import mongoose from "mongoose";
import "dotenv/config.js";

export default async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`DB faile: ${error.message}`);
    process.exit(1);
  }
}
