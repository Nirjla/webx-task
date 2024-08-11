const mongoose = require('mongoose')

const Product = new mongoose.Schema({
      name: { type: String, required: true },
      price: { type: Number, required: true },
      description: { type: String, required: true },
      image: {
            publicId: {
                  type: String,
                  required: true,
            },
            url: {
                  type: String,
                  required: true,
            }
      },

}, { timestamps: true })

module.exports = mongoose.model('Product', Product)