import Gift from "../models/Gift.js";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI();

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

export const getGiftRecsById = async (req, res, next) => {
  const id = req.params.id;
  let gift;

  try {
    gift = await Gift.findById(id);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  if (!gift) {
    return res.status(404).json({ message: "User not found" });
  }

  const giftname = gift.giftname;
  const tags = gift.tags;
  const minPrice = gift.minPrice;
  const maxPrice = gift.maxPrice;
  const tagsText = tags.reduce((accumulator, currentValue) => {
    if (accumulator === "") {
      return currentValue;
    } else {
      return accumulator + ", " + currentValue;
    }
  }, "");

  const prompt = `I would like to find three links to products for ${giftname} that are related to
  ${tagsText} from local businesses.
  The gift should also have a price range from a minimum of $${minPrice} and a maximum of $${maxPrice}.
  Please ensure that the links work and items are in stock
  
  Please format responses as a JSON object that is in the form of a string so it can be parsed as follows: 
  { "gifts": [{"link": (link to product), "name": (name product name), "price": (price)}]}`;

  let response;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  response = JSON.parse(completion.choices[0].message.content);
  const giftsArray = response.gifts;
  const payLoad = giftsArray.map((g) => {
    const query = g.name.split(" ").join("+");
    return {
      name: g.name,
      link: "https://www.amazon.ca/s?k=" + query,
      price: g.price,
    };
  });

  return res.status(200).json({ gifts: payLoad });
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
