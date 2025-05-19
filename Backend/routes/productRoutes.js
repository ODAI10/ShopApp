
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');


const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController")

router.post('/upload', upload, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = `/ImgProducts/${req.file.filename}`;
    res.status(200).json({ message: 'Image uploaded', imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Image upload failed' });
  }
});


router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);



module.exports = router;