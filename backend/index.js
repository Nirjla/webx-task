const express = require('express')
const cors = require('cors')
const { PORT } = require('./constants')
const { connectDB } = require('./db')
const routes = require('./routes/index.route')
const app = express()

// Set body size limit
app.use(express.json({ limit: '10mb' })); // Increase limit as needed
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Increase limit as needed
// Configure CORS to allow requests from http://localhost:5173
const corsOptions = {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use('/api', routes)
connectDB()
app.get('/api', (req, res) => {
      res.json({ message: "Hello from WebX" })
})
app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
})


