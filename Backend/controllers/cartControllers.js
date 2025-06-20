const CartItem = require('../models/cart_items');
const Product = require('../models/products');


// Add to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { product, quantity } = req.body;
 
    if (!product || !quantity) {
      return res.status(400).json({ message: 'Product and quantity are required' });
    }
     const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let existingItem = await CartItem.findOne({ user: userId, product });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.status(200).json({ message: 'Quantity updated in cart', cartItem: existingItem });
    } else {
      const newCartItem = new CartItem({
        user: userId,
        product,
        quantity,
      });

      await newCartItem.save();
      return res.status(201).json({ message: 'Added to cart', cartItem: newCartItem });
    }

  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error',error });
  }
};

// Show all items on the cart
const getCartItems = async (req, res) => {
  try {
    const userId = req.user.userId;
    const itemsCart = await CartItem.find({ user: userId }).populate('product');
    res.json(itemsCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Remove one item from cart
const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cartItemId = req.params.id;

    const item = await CartItem.findOneAndDelete({ _id: cartItemId, user: userId });

    if (!item) {
      return res.status(404).json({ message: 'Cart item not found or does not belong to user' });
    }

    res.status(200).json({ message: 'Item removed from cart', deletedItem: item });
  } catch (error) {
    console.error('Error deleting item from cart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//  Clear all cart items (used when creating an order)
const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    await CartItem.deleteMany({ user: userId });
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart', error: error.message });
  }
};

module.exports = {addToCart ,getCartItems ,removeCartItem,clearCart}