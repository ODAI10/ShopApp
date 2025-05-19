const Product = require("../models/products");

// Create product
exports.createProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findOne({ name: req.body.name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product with this name already exists." });
    }
     const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Show all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Show product by id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update product by id
exports.updateProduct = async (req,res)=>{
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
         { new: true }
    )
     if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
        res.json(updatedProduct);
    } catch (error) {
         res.status(400).json({ error: error.message });

    }

}

// Delete product by id
exports.deleteProduct = async( req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.json({ message: 'Product deleted' });
    } catch (error) {
       res.status(400).json({ error: error.message });
    }
}