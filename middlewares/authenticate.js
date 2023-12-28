function validateProductQuantity(req, res, next) {
  const { quantity } = req.body;
  const { price } = req.body;

  if (quantity < 3) {
    return res.status(400).json({ error: "Quantity must be at least 3." });
  }

  if (price < 500) {
    return res.status(400).json({ error: "Price must be at least 500." });
  }

  // If the quantity is valid, redirect to the homepage
  res.redirect("/home");
}

module.exports = { validateProductQuantity };
