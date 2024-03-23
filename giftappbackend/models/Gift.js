import mongoose from "mongoose";

const Schema = mongoose.Schema;
const giftSchema = new Schema({
  giftname: {
    type: String,
    required: [true, "username is required"],
    trim: true,
  },
  tags: [{ type: String }],
  minPrice: {
    type: Number,
    required: true,
  },
  maxPrice: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Gift", giftSchema);
