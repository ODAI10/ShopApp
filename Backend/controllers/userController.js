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
    const token = jwt.sign({ userId: user._id,isAdmin: false }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token",token,{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", 
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201).json({ message: "Registered successfully", user: {
       id: user._id, name: user.name, email: user.email 
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
const updateProfile  = async (req,res)=>{
 try {
   const {name,phone} = req.body; 
   const existingPhone = await User.findOne({ phone });
    if (existingPhone && existingPhone._id.toString() !== req.user.userId) {
      return res.status(400).json({ message: "Phone number already in use" });
    }
  
  const updated  = await User.findByIdAndUpdate(
     req.user.userId ,
     { name, phone },
     { new: true }
  )
  .select("-password");
  res.status(200).json(updated);
 } catch (error) {
     res.status(500).json({ message: "Server error" });

 }
}

// Delete profile
const deleteProfile = async (req,res)=>{
  try {
    await User.findByIdAndDelete(req.user.userId);
    res.clearCookie("token");
    res.status(200).json({ message: "Account deleted" });
  } catch (error) {
     res.status(500).json({ message: "Server error" });
  
  }
}





module.exports = {register,getAllUsers,getProfile,updateProfile ,deleteProfile}


