import dotenv from "dotenv";
import express from "express";
import giftRouter from "./views/gift-router.js";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/gifts", giftRouter);
app.use(cors());

mongoose.connect(`${process.env.MONGODB_URI}`).catch((e) => console.log(e));

app.listen(8080, async () => {
  console.log("Connected to MongoDB and running at http://localhost:8080");
});

export default app;
