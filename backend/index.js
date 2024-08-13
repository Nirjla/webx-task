const express = require('express')
const cors = require('cors')
const { PORT } = require('./constants')
const { connectDB } = require('./db')
const routes = require('./routes/index.route')
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', routes)
connectDB()
app.get('/api', (req, res) => {
      res.json({ message: "Hello from WebX" })
})
app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
})


// Export the function to be used by Vercel
module.exports = (req, res) => {
      return require('serverless-http')(app)(req, res);
  };