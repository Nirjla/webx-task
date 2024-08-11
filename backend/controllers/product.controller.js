const { uploadToCloudinary } = require("../config");

const createProduct = async (req, res) => {
      try {
            const { name, price, description, image } = req.body;
            if (image) {
                  const imageData = await uploadToCloudinary(image, "WebxUplaods")
            }
            const newProduct = new Product({
                  name, price, description, image:imageData
            })
            await newProduct.save()
            res.status(201).send({
                  message: "Product created successfully"
            })
      } catch (err) {
            res.status(500).json({
                  message: 'Error creating product' + err.message
            })
      }
}


module.exports = {
      createProduct
}