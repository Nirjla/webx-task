const Product = require("../models/Product")
const SubCategory = require("../models/SubCategory")
const subcategorySchema = require("../validators/subcategoryValidator")

const createSubCategory = async (req, res) => {
      try {
            const parsedData = subcategorySchema.parse(req.body)
            const subcategory = new SubCategory(parsedData)
            await subcategory.save()
            return res.status(201).json(subcategory)
      } catch (err) {
            res.status(400).json({ error: err.message });
      }
}

const getSubCategories = async (req, res) => {
      try {
            const subcategories = await SubCategory.find().populate('category')
            return res.status(200).json(subcategories)
      } catch (err) {
            res.status(400).json({ error: err.message });

      }
}


module.exports = { createSubCategory, getSubCategories }