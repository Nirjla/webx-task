const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
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
      category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
      subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }]
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)