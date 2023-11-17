const Product = require("../models/product");
const AppError = require("../utils/appError");

// Controller function to get a list of products with optional search, sorting, and pagination
exports.getAllProducts = async (req, res, next) => {
  try {
    // Set up the initial search query
    let searchQuery = {};

    // If there is a search query parameter, create a case-insensitive regex for searching by Name or Description
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, "i");
      searchQuery = {
        ...searchQuery,
        $or: [{ Name: searchRegex }, { Description: searchRegex }],
      };
    }

    // Set up sorting options based on query parameters
    let sortOptions = {};
    if (req.query.sort) {
      const sortOrder = req.query.order === "desc" ? -1 : 1;
      if (req.query.sort === "name") {
        sortOptions = { Name: sortOrder };
      } else if (req.query.sort === "date") {
        sortOptions = { CreationDate: sortOrder };
      }
    }

    // Set up pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const startIndex = (page - 1) * limit;

    // Retrieve total number of products based on the search query
    const totalProducts = await Product.countDocuments(searchQuery);

    // Retrieve products based on the search query, sort options, pagination, and collation for case-insensitive sorting
    const products = await Product.find(searchQuery)
      .collation({ locale: "en" })
      .sort(sortOptions)
      .skip(startIndex)
      .limit(limit);

    // Create pagination object for the response
    const pagination = {
      total: totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    };

    // Send the response with products and pagination information
    res.status(200).json({ products, pagination });
  } catch (err) {
    // Handle errors by passing them to the next middleware
    next(err);
  }
};

// Controller function to get a product by its ID
exports.getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;

    // Validate that productId is provided
    if (!productId) {
      return next(new AppError(`Please provide a valid product id.`, 404));
    }

    // Find the product by ID
    const productById = await Product.findById(productId);

    // If the product is not found, return an error
    if (!productById) {
      return next(new AppError(`Product with id ${productId} was not found`, 404));
    }

    // Send the product information in the response
    res.status(200).json({ productById });
  } catch (err) {
    // Handle errors by passing them to the next middleware
    next(err);
  }
};

// Controller function to add a new product
exports.addNewProduct = async (req, res, next) => {
  // Set the creation date before saving the new product
  req.body.CreationDate = Date.now();

  // Log the incoming request body
  console.log(req.body);

  try {
    // Create a new product instance with the request body
    const newProduct = new Product(req.body);

    // Save the new product to the database
    await newProduct.save();

    // Send a success response with the new product data
    res.status(200).json({
      status: "success",
      data: newProduct,
    });
  } catch (err) {
    // Handle errors by passing them to the next middleware
    next(err);
  }
};

// Controller function to update product information by ID
exports.updateProductInfo = async (req, res, next) => {
  try {
    const { productId } = req.params;

    // Validate that productId is provided
    if (!productId) {
      return next(new AppError(`Please provide a valid product id.`, 404));
    }

    // Find and update the product by ID, with options for returning the updated document and running validators
    const updatedProductInfo = await Product.findByIdAndUpdate(productId, req.body, { new: true, runValidators: true });

    // If the product is not found, return an error
    if (!updatedProductInfo) {
      return next(new AppError(`Product with id ${productId} was not found`, 404));
    }

    // Send a success response with the updated product data
    res.status(200).json({
      status: "success",
      data: updatedProductInfo,
    });
  } catch (err) {
    // Handle errors by passing them to the next middleware
    next(err);
  }
};

// Controller function to delete a product by ID
exports.deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    // Validate that productId is provided
    if (!productId) {
      return next(new AppError(`Please provide a valid product id.`, 404));
    }

    // Find and delete the product by ID
    const deletedProduct = await Product.findByIdAndDelete(productId);

    // If the product is not found, return an error
    if (!deletedProduct) {
      return next(new AppError(`Product with id ${productId} was not found`, 404));
    }

    // Send a success response with a message indicating the deletion
    res.status(200).json({
      status: "success",
      message: `Product with id ${productId} was deleted.`,
    });
  } catch (err) {
    // Handle errors by passing them to the next middleware
    next(err);
  }
};
