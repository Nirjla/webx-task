const { default: mongoose } = require('mongoose')
const { z } = require('zod')

const productSchema = z.object({
      name: z.string().min(1, "Name is required"),
      price: z.number().positive("Price must be positive number"),
      description: z.string().min(1, "Description is required"),
      categoryId: z.string().min(1, "Category Id is required").refine((val) => mongoose.Types.ObjectId.isValid(val), { message: "Invaliid Category ID format" }),
      subcategoryId: z.array(string().min(1, "SubCategory ID is required").refine((val) => mongoose.Types.ObjectId.isValid(val), {
            message: "Invalid SubCategory ID is required"
      })).nonempty("At least one Subcategory ID is required")
})

module.exports = productSchema