
const express = require('express');
const router = express.Router();
const {createOrder,getOrders,confirmOrder,getOrderById} = require("../controllers/ordersController")
const auth = require("../middleware/authMiddleware")

router.post("/",auth,createOrder)
router.get("/latest",auth,getOrders)
router.get("/:orderId", auth, getOrderById);
router.post("/:orderId/confirm", auth, confirmOrder);

module.exports = router;