const Category = require("../models/Category");
const Product = require("../models/Product");
const SubCategory = require("../models/SubCategory");
const productSchema = require("../validators/productValidator");

const createProduct = async (req, res) => {
      try {
            const parsedData = productSchema.parse(req.body)
            const { name, price, description, categoryId, subcategoryIds } = parsedData;
            const category = await Category.findById(categoryId)
            if (!category) {
                  return res.status(400).json({ message: "Category not found" })
            }
            const subcategories = await SubCategory.find({ '_id': { $in: subcategoryIds } })
            if (subcategories.length !== subcategoryIds.length) {
                  return res.status(400).json({ message: "One or more categories not found" })
            }
            const { file } = req; // Access the uploaded file
            console.log("FileData", file)
            let imageData = {};
            if (file) {
                  imageData = {
                        url: file.path, // URL of the uploaded image
                        publicId: file.filename // Public ID of the uploaded image
                  };
            }

            const newProduct = new Product({
                  name, price, description, image: imageData, category: categoryId, subcategories: subcategoryIds
            });

            await newProduct.save();
            res.status(201).send({
                  message: "Product created successfully"
            });
      } catch (err) {
            if (err instanceof z.ZodError) {
                  return res.status(400).json({
                        message: "Validation failed",
                        errors: err.errors
                  })
            }
            res.status(500).json({
                  message: 'Error creating product ' + err.message
            });
      }
};

const getProducts = async (req, res) => {
      try {
            const products = await Product.find()
            if (!products) {
                  res.status(404).json({ message: "No Products available" })
            }
            res.status(200).json(products)
      } catch (err) {
            res.status(500).json({ message: "Error fetching the product" + err.message })
      }
}

const getProductById = async (req, res) => {
      try {
            const product = await Product.findById(req.params.id)
            if (product) {
                  res.status(200).json(product)
            }
      } catch (err) {
            res.status(500).json({
                  message: err.message
            })
      }
}

const deleteProduct = async (req, res) => {
      try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                  return res.status(404).json({ message: "Product Not Found" })
            }
            await Product.findByIdAndDelete(req.params.id)
            return res.status(200).json({ message: "Product deleted successfully" });
      } catch (err) {
            console.error('Error deleting product:', err);
            return res.status(500).json({ message: `Error deleting product: ${err.message}` });
      }
}




module.exports = {
      createProduct, getProducts, getProductById, deleteProduct
}