




const express = require('express');
const router = express.Router();

const { addToCart,getCartItems,deleteItem } = require("../controllers/cartControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.post('/',authMiddleware, addToCart);
router.get('/',authMiddleware,getCartItems)
router.delete('/:id',authMiddleware,deleteItem)

module.exports = router;