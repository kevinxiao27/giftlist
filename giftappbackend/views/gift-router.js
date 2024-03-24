import express from "express";
import {
  addGift,
  deleteGiftById,
  getAllGifts,
  getGiftById,
  getGiftRecsById,
  updateGift,
} from "../controller/gift-controller.js";
import { check, param } from "express-validator";
import { validateResults } from "../middlewares/Validation.js";

const giftRouter = express();
giftRouter.get("/", getAllGifts);
giftRouter.get(
  "/gift/:id",
  [param("id").exists().not().isEmpty(), validateResults],
  getGiftById
);
giftRouter.get(
  "/recommend/:id",
  [param("id").exists().not().isEmpty(), validateResults],
  getGiftRecsById
);
giftRouter.post(
  "/",
  [
    check("giftname").not().isEmpty(),
    check("tags").isArray(),
    check("minPrice").isNumeric().not().isEmpty(),
    check("maxPrice").isNumeric().not().isEmpty(),
    validateResults,
  ],
  addGift
);
giftRouter.put(
  "/:id",
  [
    check("giftname").not().isEmpty(),
    check("tags").isArray(),
    check("minPrice").isNumeric().not().isEmpty(),
    check("maxPrice").isNumeric().not().isEmpty(),
    validateResults,
  ],
  updateGift
);

giftRouter.delete(
  "/:id",
  [param("id").exists().not().isEmpty(), validateResults],
  deleteGiftById
);

export default giftRouter;
