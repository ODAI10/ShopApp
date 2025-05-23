


const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const { validateRegister } = require('../validators/userValidator');

const { register, getAllUsers ,getProfile,updateProfile,deleteProfile} = require('../controllers/userController')

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({  message: errors.array().map((error) => error.msg).join(", ")});
  }
  next();
};

router.post("/register",validateRegister,handleValidation,register)
router.get('/allUsers', getAllUsers);
router.get("/user", getProfile)
router.put("/UpdateUser",updateProfile)
router.delete("/deleteProfile",deleteProfile)
module.exports = router;