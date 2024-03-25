import mongoose from "mongoose";
import Category from "./category.js";
const bookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "book must be unique"],
    },
    category : {
      type: mongoose.Schema.ObjectId, ref: "Category"
    } ,
     desc : { type: String, required: true },
    publisher : { type: String, required: true },
    photo: { type: String, required: true },
    issued: { type: Boolean, default: false },
    issuedBy: { type: mongoose.Types.ObjectId, ref: "User" },
    issuedAt: { type: Date },
    returnedAt: { type: Date },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'rating muust be at least 1'],
      max: [5, 'rating must max 1'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: { type: Number, default: 0 },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
  {
    timestamps: true,
  }
);
bookSchema.virtual("late").get(function () {
  const day = 24 * 60 * 60 * 1000;
  if (Date.now() - this.returnedAt > 0) {
    return Math.ceil((Date.now() - this.returnedAt) / day);
  }
});
bookSchema.virtual("fine").get(function () {
  const day = 24 * 60 * 60 * 1000;
  if (Date.now() - this.returnedAt > 0) {
    return Math.ceil((Date.now() - this.returnedAt) / day) * 50;
  }
});
const bookModel = mongoose.model("book", bookSchema);

export default bookModel;
