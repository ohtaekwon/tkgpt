import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import routeV1 from "./src/routes/index.js";

import "dotenv/config";

const { PORT, MONGO_DB_URL } = process.env;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/v1", routeV1);

const port = PORT || 8000;
const server = http.createServer(app);

mongoose.set("strictQuery", false); // strict 모드 해제
mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log("MongoDB connected");
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}`)
    );
  })
  .catch((error) => {
    console.log(`This is Error : ${{ error }}`);
    process.exit(1);
  });
