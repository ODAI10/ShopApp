const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
    icon: { type: String }, 

});

// دمج trim والتحقق من التكرار في دالة واحدة
categorySchema.pre('save', async function(next) {
  this.name = this.name.trim();

  // التحقق من التكرار
  const existingCategory = await Category.findOne({ name: this.name });
  if (existingCategory) {
    const error = new Error("Category with this name already exists.");
    return next(error);
  }

  next();
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
