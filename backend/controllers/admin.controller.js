const { generateToken } = require("../config");
const bcrypt = require('bcryptjs')
const User = require("../models/User");

const signin = async (req, res) => {
      const { email, password } = req.body;

      try {
            // Find the user by email
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                  return res.status(404).json({ message: "Admin not found" });
            }
            // Compare passwords
            const isMatch = await bcrypt.compare(password, existingUser.password);

            if (!isMatch) {
                  return res.status(400).json({ message: "Invalid email or password" });
            }

            // Check if the user is an admin (if needed)
            if (!existingUser.isAdmin) {
                  return res.status(403).json({ message: "Access denied" });
            }

            // Generate a token
            const token = generateToken(existingUser._id)
            // Send response
            return res.status(200).json({ message: "Admin login successfully", token });

      } catch (err) {
            console.error("Error during signin:", err.message);
            return res.status(500).json({ message: "Internal server error" });
      }
}



module.exports = { signin }