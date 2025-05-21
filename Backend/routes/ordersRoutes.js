


const express = require('express');
const router = express.Router();
const {createOrder,getOrders,confirmOrder} = require("../controllers/ordersController")
const auth = require("../middleware/authMiddleware")

router.post("/",auth,createOrder)
router.get("/latest",auth,getOrders)
router.post("/:orderId/confirm", auth, confirmOrder);

module.exports = router;