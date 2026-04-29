const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

exports.createCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' })
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: 'mad',
        product_data: {
          name: `${item.name} - ${item.size}`,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: 'http://localhost:5173/thank-you',
      cancel_url: 'http://localhost:5173/cart',
    })

    res.json({ url: session.url })
  } catch (error) {
    console.error('Stripe error:', error)
    res.status(500).json({ error: 'Stripe checkout failed' })
  }
}