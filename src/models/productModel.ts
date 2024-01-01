import mongoose from "mongoose";

// Define the schema for the Product
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Refers to the "User" model
  },
});

// Create a Mongoose model based on the schema
const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
