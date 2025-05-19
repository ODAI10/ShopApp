

const express = require('express');
const router = express.Router();

const { login ,logOut,getMe } = require("../controllers/authControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login",login)
router.delete('/logout',logOut)
router.get('/me',authMiddleware,  getMe);


module.exports = router;