const mongoose = require("mongoose");

productSchema = new mongoose.Schema({
  Name: {
    type: String,
    maxlength: 30,
    required: true,
  },
  Description: {
    type: String,
    maxlength: 200,
  },
  Price: {
    type: Number,
    min: 0.01,
    required: true,
  },
  CreationDate: {
    type: Date,
    required: true,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
