const mongoose = require('mongoose')
const { DB_URL } = require('./constants')

module.exports.connectDB = async () => {
      try {
            await mongoose.connect(DB_URL)
            console.log('MongoDB connected')
      } catch (err) {
            console.log(err.message)
      }
}

