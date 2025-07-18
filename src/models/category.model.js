const mongoose = require("mongoose");
const { Schema } = mongoose;
const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
    categroyDescription: {
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

const CategroyModel = mongoose.model("categories", categorySchema);
module.exports = { CategroyModel };
