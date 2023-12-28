const Product = require("../models/product");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ message: "error getting products" });
  }
};

exports.postProduct = async (req, res) => {
  const { name, price, quantity, type, imageUrl } = req.body;
  const newProduct = new Product({ name, price, quantity, type, imageUrl });
  await newProduct.save();
  res.json(newProduct);
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, quantity, type, imageUrl } = req.body;
    console.log("Updating product with ID:", req.params.id);
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, quantity, type, imageUrl },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.json(deletedProduct);
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.json(product);
  } catch (err) {
    return res.status(500).json({ message: "error getting products" });
  }
};
// app.get('/products/:id', async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   res.json(product);
// });
