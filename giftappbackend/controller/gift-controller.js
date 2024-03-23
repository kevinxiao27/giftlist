import Gift from "../models/Gift.js";

export const getAllGifts = async (req, res, next) => {
  let gifts;
  try {
    gifts = await Gift.find();
  } catch (e) {
    console.log(e);
  }

  if (!gifts) {
    return res.status(500).json({ message: "Unexpected error" });
  }

  return res.status(200).json({ gifts });
};

export const getGiftById = async (req, res, next) => {
  let gift;
  const id = req.params.id;

  try {
    gift = await Gift.findById(id);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  if (!gift) {
    return res.status(404).json({ message: "Gift not found" });
  }

  return res.status(200).json({ gift });
};

export const addGift = async (req, res, next) => {
  let gift;
  const { giftname, tags, minPrice, maxPrice } = req.body;

  if (minPrice > maxPrice) {
    return res.status(401).json({ message: "Bad request" });
  }

  try {
    gift = new Gift({ giftname, tags, minPrice, maxPrice });
    gift = await gift.save();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: "Malformed request" });
  }

  if (!gift) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  return res
    .status(200)
    .json({ message: "Successfully added gift to wishlist" });
};

export const updateGift = async (req, res, next) => {
  let gift;
  const id = req.params.id;

  const { giftname, tags, minPrice, maxPrice } = req.body;

  if (minPrice > maxPrice) {
    return res.status(401).json({ message: "Bad request" });
  }

  try {
    gift = await Gift.findByIdAndUpdate(id, {
      giftname,
      tags,
      minPrice,
      maxPrice,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  if (!gift) {
    return res.status(404).json({ message: "Gift not found" });
  }

  return res
    .status(200)
    .json({ message: "Successfully updated gift: " + gift.giftname });
};

export const deleteGiftById = async (req, res, next) => {
  let gift;
  const id = req.params.id;

  try {
    gift = await Gift.findByIdAndDelete(id);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  if (!gift) {
    return res.status(404).json({ message: "Gift not found" });
  }

  return res.status(200).json({ message: "Gift successfully deleted" });
};
