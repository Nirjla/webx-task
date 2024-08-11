const jwt = require('jsonwebtoken')
const { SECRET_KEY, CLOUDINARY } = require('./constants')
const cloudinary = require('cloudinary').v2;
const generateToken = (user) => {
      return jwt.sign(
            {
                  id: user._id
            },
            SECRET_KEY,
            { expiresIn: '1hr' }
      )
}

const uploadToCloudinary = async (apth, folder = 'WebxUploads') => {
      try {
            const data = await cloudinary.uploader.upload(path, { folder: folder })
            return { url: data.secure_url, publicId: data.public_id }
      } catch (err) {
            console.log(err)
      }
}

cloudinary.config({
      cloud_name: CLOUDINARY.cloud_name,
      api_key: CLOUDINARY.api_key,
      api_secret: CLOUDINARY.api_secret
});

module.exports = {
      generateToken,
      cloudinary,
      uploadToCloudinary
}