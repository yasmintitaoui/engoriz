const express = require('express')
const { createClient } = require('@supabase/supabase-js')

const router = express.Router()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

router.post('/', async (req, res) => {
  try {
    const order = req.body

    if (!order || !order.customer || !order.items?.length) {
      return res.status(400).json({
        error: 'Invalid order data',
      })
    }

    const savedOrder = {
      id: `ENG-SS26-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: order.customer,
      items: order.items,
      subtotal: order.subtotal || 0,
      discount: order.discount || 0,
      shipping: order.shipping || 0,
      total: order.total || 0,
      payment_method: order.paymentMethod || 'Cash on Delivery',
      status: 'received',
    }

    const { error } = await supabase
      .from('orders')
      .insert(savedOrder)

    if (error) {
      console.error(error)
      return res.status(500).json({
        error: 'Failed to save order',
      })
    }

    return res.status(201).json({
      success: true,
      orderId: savedOrder.id,
    })
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      error: 'Server error',
    })
  }
})

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return res.status(500).json({
      error: 'Failed to fetch orders',
    })
  }

  res.json({
    orders: data || [],
  })
})

router.patch('/:id/status', async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  const { data, error } = await supabase
    .from('orders')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()

  if (error) {
    return res.status(500).json({
      error: 'Failed to update order',
    })
  }

  res.json({
    success: true,
    order: data?.[0],
  })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id)

  if (error) {
    return res.status(500).json({
      error: 'Failed to delete order',
    })
  }

  res.json({
    success: true,
  })
})

module.exports = router