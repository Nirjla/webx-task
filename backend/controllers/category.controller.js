const Category = require("../models/Category");
const Product = require("../models/Product");
const categorySchema = require("../validators/categoryValidator");

const createCategory = async (req, res) => {
      try {
            const parsedData = categorySchema.parse(req.body)
            const category = new Category(parsedData)
            await category.save();
            return res.status(201).json(category)
      } catch (err) {
            res.status(400).json({ error: err.errors });
      }

}

const getCategories = async (req, res) => {
      try {
            const categories = await Category.find()
            return res.status(200).json(categories)
      } catch (err) {
            return res.status(500).json({ error: err.message })
      }
}


const getProductsByCategory = async (req, res) => {
      try {
            const { id } = req.params
            console.log("SubId", id)
            const productByCategory = await Product.find({ category: id }).populate('category').populate('subcategories')
            console.log(productByCategory)
            if (!productByCategory) {
                  return res.status(400).json({ message: "No productByCategory found" })
            }
            return res.status(200).json(productByCategory)
      } catch (err) {
            res.status(400).json({ error: err.message });

      }
}


module.exports = { createCategory, getCategories , getProductsByCategory}