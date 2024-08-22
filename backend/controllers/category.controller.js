const Category = require("../models/Category");
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



module.exports = { createCategory ,getCategories}