const { config } = require('dotenv')
config()



module.exports = {
      DB_URL: process.env.DB_URL,
      NODE_ENV:process.env.NODE_ENV,
      PORT: process.env.PORT,
      SECRET_KEY: process.env.SECRET_KEY,
      CLOUDINARY: {
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET

      }

}