const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()

const ordersFilePath = path.join(__dirname, '..', 'data', 'orders.json')

function readOrders() {
  try {
    if (!fs.existsSync(ordersFilePath)) return []
    const file = fs.readFileSync(ordersFilePath, 'utf8')
    return JSON.parse(file || '[]')
  } catch (error) {
    console.error('Failed to read orders:', error)
    return []
  }
}

function writeOrders(orders) {
  const dataDir = path.dirname(ordersFilePath)

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2))
}

router.post('/', (req, res) => {
  const order = req.body

  if (!order || !order.customer || !order.items || order.items.length === 0) {
    return res.status(400).json({ error: 'Invalid order data' })
  }

  const orders = readOrders()

  const savedOrder = {
    id: `ENG-SS26-${Math.floor(1000 + Math.random()*9000)}`,
    ...order,
    status: 'new',
  }

  orders.unshift(savedOrder)
  writeOrders(orders)

  return res.status(201).json({
    success: true,
    message: 'Order received',
    orderId: savedOrder.id,
  })
})

router.get('/', (req, res) => {
  const orders = readOrders()
  res.json({ count: orders.length, orders })
})

router.patch('/:id/status', (req, res) => {
  const { id } = req.params
  const { status } = req.body

  const allowedStatuses = ['new', 'confirmed', 'shipped', 'delivered', 'cancelled']

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }

  const orders = readOrders()
  const orderIndex = orders.findIndex((order) => order.id === id)

  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' })
  }

  orders[orderIndex].status = status
  orders[orderIndex].updatedAt = new Date().toISOString()

  writeOrders(orders)

  res.json({
    success: true,
    order: orders[orderIndex],
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  const orders = readOrders()
  const filteredOrders = orders.filter((order) => order.id !== id)

  if (filteredOrders.length === orders.length) {
    return res.status(404).json({ error: 'Order not found' })
  }

  writeOrders(filteredOrders)

  res.json({
    success: true,
    message: 'Order deleted',
  })
})

module.exports = router