import Gift from "../models/Gift";
import mongoose from "mongoose";

export const getAllGifts = async (req, res, next) => {
  const { giftname, tags, minPrice, maxPrice } = req.body;
};
