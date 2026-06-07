import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import cors from "cors";

//config
import connectDB from "./config/connectDB.js";

//routes
import router from "./routes/routes.js";

//middleware
import successHandler from "./middlewares/successHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`server is running on ${PORT} successfully`);
});

//******************Middleware***************//

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//success handler
app.use(successHandler);

app.use("/api", router);

//error handler
app.use(errorHandler);
