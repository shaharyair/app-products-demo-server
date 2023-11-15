const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/", productController.getAllProducts);

router.post("/addNewProduct", productController.addNewEmptyProduct);

router.post("/updateProduct/:productId", productController.updateProductInfo);

router.delete("/deleteProduct/:productId", productController.deleteProduct);

module.exports = router;
