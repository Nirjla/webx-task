const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require('../config')
const storage = new CloudinaryStorage({
      cloudinary,
      params: {
            folder: 'WebxUploads',
            allowedFormats: ['jpeg', 'jpg', 'png']
      }
})

module.exports = { storage }