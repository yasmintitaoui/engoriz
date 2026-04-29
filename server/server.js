const express = require('express')
const cors = require('cors')
const orderRoutes = require('./routes/orderRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
  res.send('ENGORIZ server is running')
})

const PORT = 4000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})