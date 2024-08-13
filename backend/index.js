const express = require('express')
const cors = require('cors')
const { PORT } = require('./constants')
const { connectDB } = require('./db')
const routes = require('./routes/index.route')
const app = express()

app.use(express.json())
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


