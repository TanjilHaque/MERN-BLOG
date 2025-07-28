const mongoose = require("mongoose");
const { Schema } = mongoose;
const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
    categoryDescription: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model("categories", categorySchema);
module.exports = { CategoryModel };
