


const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js') ; 
const checkRole = require('../middleware/authorizeRoles.js') ; //new

const {getCategories, createCategory,updateCategory,deleteCategory} = require("../controllers/categoryController")


router.post("/",authMiddleware,checkRole("superadmin","admins"),createCategory)//new
router.get("/user",getCategories)
router.get("/",authMiddleware,checkRole("superadmin","admins"),getCategories)
router.put("/:id",authMiddleware,checkRole("superadmin","admins"),updateCategory)//new
router.delete("/:id",authMiddleware,checkRole("superadmin","admins"),deleteCategory)//new

module.exports = router;