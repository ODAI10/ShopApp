const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require('../models/admins'); 
const User = require('../models/users');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check admin
    const admin = await Admin.findOne({ email });
    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

      const token = jwt.sign(
        { userId: admin._id, name: admin.name, isAdmin: true },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }).status(200).json({
        message: "Admin login successful",
        user: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
        },
        isAdmin: true,
        
      });
    }

    // check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { userId: user._id, name: user.name, isAdmin: false },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }).status(200).json({
      message: "User login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      isAdmin: false,
      
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const logOut  = async (req,res)=>{
  res.clearCookie("token",{
     httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  })
    res.status(200).json({ message: "Logged out successfully" });
}

 // Find user by ID from the decoded token
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {login,logOut,getMe};