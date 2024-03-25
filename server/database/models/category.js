import mongoose from "mongoose";
const categorySchema = mongoose.Schema(
  {
    title: { type: String, required: [true, "title is required"]  , unique: [true, "email is unique"],},
    desc: { type: String, required: [true, "description is required"] }
  },
  {
    timestamps: true,
  }
);
const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;
