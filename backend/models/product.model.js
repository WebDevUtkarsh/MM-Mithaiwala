import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["sweets", "snacks"],
    },
    basePrice: {
      type: Number,
      required: [true, "Base price is required"],
    },
    gstRate: {
      type: Number,
      required: [true, "GST rate is required"],
    },
    variants: [variantSchema], // updated
    image: {
      type: String, // Parent product image
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;