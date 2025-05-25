const CartItem = require("../models/cart_items");
const Order = require("../models/orders");
const Product = require("../models/products");

// Create order
const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;

    // 1. جلب عناصر السلة
    const cartItems = await CartItem.find({ user: userId }).populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2. تجهيز عناصر الطلب
    const orderItems = cartItems.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      unitPrice: item.product.price,
    }));

    // 3. حساب المجموع الكلي
    const totalAmount = orderItems.reduce(
      (total, item) => total + item.quantity * item.unitPrice,
      0
    );

    // 4. إنشاء الطلب
    const newOrder = new Order({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingMethod: req.body.shippingMethod || "Standard",
    });

    await newOrder.save();

    // **لا تحذف السلة هنا**

    res.status(201).json({ message: "Order created successfully", order: newOrder });

  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get latest order
const getOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const latestOrder = await Order.findOne({ user: userId, status: { $ne: "confirmed" } })
      .populate("user", "name email phone address")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({ order: latestOrder });

  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orderId = req.params.orderId;

    const order = await Order.findOne({ _id: orderId, user: userId })
      .populate("user", "name email phone address")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });

  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const confirmOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orderId = req.params.orderId;

    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "confirmed";
    if (req.body.paymentMethod) {
      order.paymentMethod = req.body.paymentMethod;
    }

    await order.save();

    // حذف عناصر السلة بعد تأكيد الطلب
    await CartItem.deleteMany({ user: userId });

    res.status(200).json({ message: "Order confirmed successfully", order });

  } catch (error) {
    console.error("Error confirming order:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createOrder, getOrders, getOrderById, confirmOrder };
