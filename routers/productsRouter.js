const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/", productController.getAllProducts);

router.get("/:productId", productController.getProductById);

router.post("/addNewProduct", productController.addNewProduct);

router.post("/updateProduct/:productId", productController.updateProductInfo);

router.delete("/deleteProduct/:productId", productController.deleteProduct);

module.exports = router;
