import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import apiRouter from "./routes/api.js";
import fileUpload from "express-fileupload"

import cors from "cors";
import "./db/mongoose.js";
import { port } from "./config.js";

// content-type: application/json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(fileUpload())
app.use("/api", apiRouter);



// server
app.listen(port, function () {
  console.log("serwer słucha... http://localhost:" + port);
});
