const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { validateProduct } = require("../validators/userValidator");
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/authorizeRoles');

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

// حماية رفع الصور - فقط للأدمن والمشرفين
router.post('/upload', authMiddleware, checkRole('admin', 'superadmin'), upload, (req, res) => {
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

// إضافة منتج - فقط الأدمن والمشرفين
router.post('/', authMiddleware, checkRole('admin', 'superadmin'), validateProduct, createProduct);

// جلب كل المنتجات - متاح للجميع
router.get('/', getAllProducts);

// جلب منتج حسب الـ ID - متاح للجميع
router.get('/:id', getProductById);

// تحديث منتج - فقط الأدمن والمشرفين
router.put('/:id', authMiddleware, checkRole('admin', 'superadmin'), updateProduct);

// حذف منتج - فقط الأدمن والمشرفين
router.delete('/:id', authMiddleware, checkRole('admin', 'superadmin'), deleteProduct);

module.exports = router;
