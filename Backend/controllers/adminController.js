const Admin = require("../models/admins");
const bcrypt = require("bcryptjs");
const Product = require("../models/products");


// create superAdmin 
const createSuperAdmin = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

  
     const count = await Admin.countDocuments({role:'superadmin'})
     if(count >= 2 ){
            return res.status(403).json({ message: "Maximum number of superadmins reached" });

     }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSuperAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "superadmin",
    });

    await newSuperAdmin.save();

    res.status(201).json({
      message: "Superadmin created successfully",
      admin: {
        id: newSuperAdmin._id,
        name: newSuperAdmin.name,
        email: newSuperAdmin.email,
        role: newSuperAdmin.role,
      }
    });

  } catch (err) {
    console.error("Error creating superadmin:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllSuperAdmins = async (req, res) => {
  try {
    // جلب جميع السوبر أدمنز بدون إظهار كلمة المرور
    const superAdmins = await Admin.find({ role: "superadmin" }).select("-password");

    res.status(200).json({ superAdmins });
  } catch (err) {
    console.error("Error fetching superadmins:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const getAllAdminsWithProducts = async (req, res) => {
  try {
    const admin = await Admin.find({ role: "admins" }).select("-password");

    const adminsWithProducts = await Promise.all(
      admin.map(async (admin) => {
        const products = await Product.find({ admin: admin._id });
        return {
          admin,
          products
        };
      })
    );

    res.status(200).json(adminsWithProducts);
  } catch (error) {
    console.error("Error fetching admin with products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllAdmin = async (req,res)=>{
  try {
    const admins = await Admin.find({ role: "admins" }).select("-password")
        res.status(200).json({ admins });
  } catch (error) {
     console.error("Error fetching admins:", error);
    res.status(500).json({ message: "Server error" });
  }
}

const getCurrentAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.userId).select('-password');
    res.json(admin);
  } catch (error) {
    console.error("Fetch admin error:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// SuperAdmin create admin
const createAdmin = async (req, res) => {
  try {
    const { name,email, password, phone, role } = req.body;

    // Check if admin already exists
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: "Admin already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role || "admins", 
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
  } catch (err) {
    console.error("Create admin error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update admin
const updateAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const { name, email, phone, role, password } = req.body;

    // تحضير بيانات التحديث
    const updateData = { name, email, phone, role };

    // لو تم إرسال كلمة مرور جديدة، نعمل لها هاش
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateData, { new: true });

    if (!updatedAdmin) return res.status(404).json({ message: "Admin not found" });

    res.status(200).json({ message: "Admin updated successfully", admin: updatedAdmin });
  } catch (error) {
    console.error("Update admin error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete admin
const deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;

    const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    if (!deletedAdmin) return res.status(404).json({ message: "Admin not found" });

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Delete admin error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createAdmin,createSuperAdmin,getAllAdminsWithProducts,getAllSuperAdmins,getAllAdmin,updateAdmin,deleteAdmin ,getCurrentAdmin
};
