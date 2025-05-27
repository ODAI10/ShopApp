const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create User (Register user)
const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const existingEmail = await User.findOne({ email });

    // Check if email already exists
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Check if email already exists
     const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id,role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token",token,{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", 
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201).json({ message: "Registered successfully", user: {
       id: user._id, name: user.name, email: user.email ,  role: user.role
      },
     });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Server error" });

  }
};


// Get all users
const getAllUsers  = async (req,res)=>{
  try {
    const users = await User.find()
    res.status(200).json(users);
  } catch (error) {
      console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Get one  user
const getProfile   = async (req,res)=>{
  try {
    const user = await User.findById(req.user.userId).select("-password")
    if(!user) return res.status(404).json({ message: "User not found" });
     res.status(200).json(user);
  } catch (error) {
     res.status(500).json({ message: "Server error" });

  }
}

// Update profile user
const updateProfile = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    const userIdToUpdate = req.params.userId;

    // تحقق من صلاحيات المستخدم
    if (req.user.role !== "superadmin" && userIdToUpdate !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed to edit other users" });
    }

    // تحقق من رقم الهاتف
    const existingPhone = await User.findOne({ phone });
    if (existingPhone && existingPhone._id.toString() !== userIdToUpdate) {
      return res.status(400).json({ message: "Phone number already in use" });
    }

    const updateData = { name, phone };

    // إذا تم إرسال كلمة مرور جديدة، نعمل لها هاش
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    // تحديث البيانات
    const updated = await User.findByIdAndUpdate(
      userIdToUpdate,
      updateData,
      { new: true }
    ).select("-password");

    res.status(200).json(updated);

  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete profile
const deleteProfile = async (req, res) => {
  try {
    const userIdToDelete = req.params.userId || req.user.userId;

    // فقط السوبرأدمن يستطيع حذف غيره
    if (userIdToDelete !== req.user.userId && req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Not allowed to delete this user" });
    }

    await User.findByIdAndDelete(userIdToDelete);

    // إذا كان يحذف نفسه، نحذف التوكن
    if (userIdToDelete === req.user.userId) {
      res.clearCookie("token");
    }

    res.status(200).json({ message: "Account deleted" });

  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};






module.exports = {register,getAllUsers,getProfile,updateProfile ,deleteProfile}


