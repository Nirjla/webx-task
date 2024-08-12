const Product = require("../models/Product");

const createProduct = async (req, res) => {
      try {
            const { name, price, description } = req.body;
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
                  name, price, description, image: imageData
            });

            await newProduct.save();
            res.status(201).send({
                  message: "Product created successfully"
            });
      } catch (err) {
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

module.exports = {
      createProduct, getProducts, getProductById
}