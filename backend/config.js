const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('./constants')
const generateToken = (userId, isAdmin) => {
      return jwt.sign(
            {
                  id: userId,
                  isAdmin: isAdmin
            },
            SECRET_KEY,
            { expiresIn: '1hr' }
      )
}



module.exports = {
      generateToken,
}