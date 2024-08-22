const SubCategory = require("../models/SubCategory")
const subcategorySchema = require("../validators/subcategoryValidator")

const createSubCategory = async (req, res) => {
      try {
            const parsedData = subcategorySchema.parse(req.body)
            const subcategory = new SubCategory(parsedData)
            await subcategory.save()
            return res.status(201).json(subcategory)
      } catch (err) {
            res.status(400).json({ error: err.errors });
      }
}

module.exports = { createSubCategory }