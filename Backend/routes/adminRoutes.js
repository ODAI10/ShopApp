const express = require("express");
const router = express.Router();
const {
  createAdmin,
  createSuperAdmin,
  getAllAdminsWithProducts,
  getAllSuperAdmins,
  getAllAdmin,
  getCurrentAdmin,
  updateAdmin,    // استورد دالة التعديل
  deleteAdmin     // استورد دالة الحذف
} = require("../controllers/adminController");

const authenticate = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");
const { validateRegister } = require("../validators/userValidator");

// Create admin (superadmin only)
router.post("/create", authenticate, validateRegister, authorizeRoles("superadmin"), createAdmin);

// Create superadmin (superadmin only)
router.post("/create-superadmin", validateRegister, authenticate, authorizeRoles("superadmin"), createSuperAdmin);

// Initial superadmin creation
router.post("/init", validateRegister, createSuperAdmin);

// Get all admins + products
router.get("/admin-with-products", authenticate, authorizeRoles("superadmin"), getAllAdminsWithProducts);

// Get all admins 
router.get("/admins", authenticate, authorizeRoles("superadmin"), getAllAdmin);

// Get all superadmins
router.get("/superadmins", authenticate, getAllSuperAdmins);

// Get current admin
router.get("/CurrentAdmin", authenticate, getCurrentAdmin);

// Update admin by id (superadmin only)
router.put("/:id", authenticate, authorizeRoles("superadmin"), updateAdmin);

// Delete admin by id (superadmin only)
router.delete("/:id", authenticate, authorizeRoles("superadmin"), deleteAdmin);

module.exports = router;
