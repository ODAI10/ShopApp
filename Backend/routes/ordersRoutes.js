
const express = require('express');
const router = express.Router();
const {createOrder,getOrders,confirmOrder,getOrderById,getAllOrders} = require("../controllers/ordersController")
const auth = require("../middleware/authMiddleware")

router.post("/",auth,createOrder)
router.get("/latest",auth,getOrders)
router.get("/:orderId", auth, getOrderById);
router.post("/:orderId/confirm", auth, confirmOrder);
router.get("/orders/all", auth, getAllOrders);

module.exports = router;