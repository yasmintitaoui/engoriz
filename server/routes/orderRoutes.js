const express = require('express')
const { createClient } = require('@supabase/supabase-js')
const { Resend } = require('resend')
const auth = require('../middleware/auth')

const router = express.Router()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const resend = new Resend(process.env.RESEND_API_KEY)

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

    const itemsHtml = savedOrder.items
      .map(
        (item) => `
          <div style="margin-bottom:16px;">
            <p style="margin:0;font-weight:600;">
              ${item.name}
            </p>

            <p style="margin:4px 0;color:#666;">
              ${item.color || 'Black'} · ${item.fit || 'Regular'} · Size ${
          item.size
        } · Qty ${item.quantity}
            </p>

            <p style="margin:0;">
              MAD ${(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        `
      )
      .join('')

    try {
      await resend.emails.send({
        from: 'ENGORIZ <orders@engoriz.com>',
        to: savedOrder.customer.email,
        subject: `Order Confirmation — ${savedOrder.id}`,
        html: `
          <div style="font-family:Arial,sans-serif;padding:24px;max-width:600px;margin:auto;">
            <h1 style="font-size:28px;margin-bottom:8px;">
              Thank you for your order.
            </h1>

            <p style="color:#666;margin-bottom:24px;">
              Your ENGORIZ order has been received and is now being processed.
            </p>

            <div style="padding:16px;border:1px solid #e5e5e5;border-radius:16px;margin-bottom:24px;">
              <p style="margin:0 0 8px 0;font-weight:600;">
                Order ID
              </p>

              <p style="margin:0;">
                ${savedOrder.id}
              </p>
            </div>

            <div style="margin-bottom:24px;">
              ${itemsHtml}
            </div>

            <div style="padding-top:16px;border-top:1px solid #e5e5e5;">
              <p style="margin:0 0 8px 0;">
                Subtotal: MAD ${savedOrder.subtotal.toLocaleString()}
              </p>

              <p style="margin:0 0 8px 0;">
                Shipping: MAD ${savedOrder.shipping.toLocaleString()}
              </p>

              <p style="margin:0;font-size:18px;font-weight:700;">
                Total: MAD ${savedOrder.total.toLocaleString()}
              </p>
            </div>

            <p style="margin-top:32px;color:#666;line-height:1.7;">
              You will receive another update once your order status changes.
            </p>
          </div>
        `,
      })

      await resend.emails.send({
        from: 'ENGORIZ <orders@engoriz.com>',
        to: process.env.ADMIN_EMAIL,
        subject: `New Order — ${savedOrder.id}`,
        html: `
          <div style="font-family:Arial,sans-serif;padding:24px;">
            <h1>New ENGORIZ Order</h1>

            <p>
              ${savedOrder.customer.fullName}
            </p>

            <p>
              ${savedOrder.customer.phone}
            </p>

            <p>
              ${savedOrder.customer.city}
            </p>

            <p>
              Total: MAD ${savedOrder.total.toLocaleString()}
            </p>
          </div>
        `,
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
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

router.get('/', auth, async (req, res) => {
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

router.patch('/:id/status', auth, async (req, res) => {
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

router.delete('/:id', auth, async (req, res) => {
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