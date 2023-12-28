const express = require("express");
const { signup, signin } = require("../controller/auth");
const {
  postProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getProduct,
} = require("../controller/product");
const router = express.Router();
const { validateProductQuantity } = require("../middlewares/authenticate");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/createProduct", validateProductQuantity, postProduct);
router.get("/getProducts", getProducts);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
