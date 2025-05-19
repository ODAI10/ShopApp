

const Category  = require("../models/Category")


// Show category
exports.getCategories= async (req,res)=>{
    try {
        const categories  = await Category.find().sort({ createdAt: -1 })
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

// Create category 
exports.createCategory =  async (req,res)=>{
    try {
        const category  = new Category(req.body)
        await category.save()
        res.status(201).json(category);

    } catch (error) {
       res.status(400).json({ error: error.message });
    }
}

//  Update category
exports.updateCategory  = async (req,res)=>{
    try {
        const updateCat = await Category.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        )
        res.json(updateCat)
    } catch (error) {
        res.status(400).json({ error: error.message });

    }
}

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};