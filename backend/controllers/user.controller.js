const { generateToken } = require("../config")
const bcrypt = require('bcryptjs')
const User = require("../models/User")
const signup = async (req, res) => {
      const { username, email, password } = req.body
      try {
            const existingUser = await User.findOne({ email })
            if (existingUser) {
                  return res.status(400).json({
                        message: "User already exists"
                  })
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                  username, email, password: hashedPassword
            })
            await newUser.save();
            return res.status(201).json({
                  message: "User registered successfully"
            })
      } catch (error) {
            console.error("Error registering user", error)
      }
}

const signin = async (req, res) => {
      const { email, password } = req.body
      try {
            const existingUser = await User.findOne({ email })
            if (!existingUser) {
                  return res.status(400).send({
                        message: "User Not Found"
                  })
            }
            const isMatch = await bcrypt.compare(password, existingUser.password)
            if (!isMatch) {
                  return res.status(400).json({ message: "Invalid email or password" })
            }
            const token = generateToken(existingUser._id, existingUser.isAdmin)
            return res.status(200).json({
                  message: "Logged In Successfully",
                  token: token
            })
      } catch (err) {
            return res.status(500).json({
                  message: "Error logging user"
            })
      }
}

module.exports = {
      signup, signin
}