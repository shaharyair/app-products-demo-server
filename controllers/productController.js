const Product = require("../models/product");
const AppError = require("../utils/appError");

exports.getAllProducts = async (req, res, next) => {
  try {
    let searchQuery = {};

    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, "i");
      searchQuery = {
        ...searchQuery,
        $or: [{ Name: searchRegex }, { Description: searchRegex }],
      };
    }

    let sortOptions = {};

    if (req.query.sort) {
      const sortOrder = req.query.order === "desc" ? -1 : 1;

      if (req.query.sort === "name") {
        sortOptions = { Name: sortOrder };
      } else if (req.query.sort === "date") {
        sortOptions = { CreationDate: sortOrder };
      }
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const startIndex = (page - 1) * limit;

    const totalProducts = await Product.countDocuments(searchQuery);

    const products = await Product.find(searchQuery).sort(sortOptions).skip(startIndex).limit(limit);

    const pagination = {
      total: totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    };

    res.status(200).json({ products, pagination });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return next(new AppError(`Please provide a valid product id.`, 404));
    }

    const productById = await Product.findById(productId);

    if (!productById) {
      return next(new AppError(`Product with id ${productId} was not found`, 404));
    }

    res.status(200).json({ productById });
  } catch (err) {
    next(err);
  }
};

exports.addNewEmptyProduct = async (req, res, next) => {
  try {
    const newProduct = new Product({
      CreationDate: Date.now(),
    });

    await newProduct.save();

    res.status(200).json({
      status: "success",
      data: newProduct,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProductInfo = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return next(new AppError(`Please provide a valid product id.`, 404));
    }

    const updatedProductInfo = await Product.findByIdAndUpdate(productId, req.body, { new: true, runValidators: true });

    if (!updatedProductInfo) {
      return next(new AppError(`Product with id ${productId} was not found`, 404));
    }

    res.status(200).json({
      status: "success",
      data: updatedProductInfo,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return next(new AppError(`Please provide a valid product id.`, 404));
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return next(new AppError(`Product with id ${productId} was not found`, 404));
    }

    res.status(200).json({
      status: "success",
      message: `Product with id ${productId} was deleted.`,
    });
  } catch (err) {
    next(err);
  }
};
