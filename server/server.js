require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const orderRoutes = require('./routes/orderRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(cookieParser())
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://engoriz.com',
    'https://www.engoriz.com',
  ],
  credentials: true,
}))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
  res.send('ENGORIZ server is running')
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})