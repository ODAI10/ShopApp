




const express = require('express');
const router = express.Router();

const { addToCart,getCartItems,removeCartItem,clearCart } = require("../controllers/cartControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.post('/',authMiddleware, addToCart);
router.get('/',authMiddleware,getCartItems)
router.delete('/removeCart',authMiddleware,clearCart)
router.delete('/:id',authMiddleware,removeCartItem)
module.exports = router;