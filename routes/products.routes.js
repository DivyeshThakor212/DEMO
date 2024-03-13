const express = require("express");
const {
  createProduct, getProducts, getProduct, updateProduct, deleteProduct,} = require("../controllers/products.controller");

const router = express.Router();

//Post
router
  .route("/create-product")
  .post(createProduct);
router
  .route("/get-products")
  .get(getProducts);
router.route("/get-product/:id").get(getProduct);
router.route("/update-product/:id").put(updateProduct);
router.route("/delete-product/:id").delete(deleteProduct);
module.exports = router;