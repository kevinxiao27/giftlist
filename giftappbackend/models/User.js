import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  gifts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Gift",
    },
  ],
});

export default userSchema;
