const mongoose = require('mongoose');
const { z } = require('zod');

const productSchema = z.object({
      name: z.string().min(1, "Name is required"),
      price: z.preprocess((val) => parseFloat(val), z.number().positive("Price must be a positive number")),
      description: z.string().min(1, "Description is required"),
      categoryId: z.string().min(1, "Category ID is required").refine((val) => mongoose.Types.ObjectId.isValid(val), { message: "Invalid Category ID format" }),
      subcategoryIds: z.array(z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
            message: "Invalid SubCategory ID format"
      })).nonempty("At least one Subcategory ID is required")
});

module.exports = productSchema;
