const express = require('express')
const cors = require('cors')
const { PORT, NODE_ENV } = require('./constants')
const { connectDB } = require('./db')
const routes = require('./routes/index.route')
const app = express()

// Set body size limit
app.use(express.json({ limit: '10mb' })); // Increase limit as needed
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Increase limit as needed
// Configure CORS to allow requests from http://localhost:5173

const isDevelopment =  NODE_ENV === 'development';
const corsOptions = {
      origin:
            isDevelopment ? ['http://localhost:5173']:
            ['https://webx-task-client.vercel.app', 'https://webx-task-admin.vercel.app'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
};
app.options('*', cors(corsOptions)); // Handle preflight requests for all routes
app.use(cors(corsOptions));
app.use('/api', routes)
connectDB()
app.get('/api', (req, res) => {
      res.json({ message: "Hello from WebX" })
})
app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
})


