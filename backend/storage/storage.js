const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require('cloudinary').v2;
const { CLOUDINARY } = require('../constants');

cloudinary.config({
      cloud_name: CLOUDINARY.cloud_name,
      api_key: CLOUDINARY.api_key,
      api_secret: CLOUDINARY.api_secret
});

const storage = new CloudinaryStorage({
      cloudinary,
      params: {
            folder: 'WebxUploads',
            allowedFormats: ['jpeg', 'jpg', 'png']
      }
});

module.exports = { storage };
