




const express = require('express');
const router = express.Router();

const { addToCart,getCartItems } = require("../controllers/cartControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.post('/',authMiddleware, addToCart);
router.get('/',authMiddleware,getCartItems)

module.exports = router;