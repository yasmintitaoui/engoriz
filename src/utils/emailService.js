const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

async function sendOrderEmail({ to, subject, html }) {
  if (!to) return

  await transporter.sendMail({
    from: `"ENGORIZ" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  })
}

function orderReceivedTemplate(order) {
  return `
    <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6">
      <h1>Thank you for your order.</h1>
      <p>Your ENGORIZ order has been received.</p>

      <p><strong>Order:</strong> ${order.id}</p>
      <p><strong>Total:</strong> MAD ${order.total}.00</p>
      <p><strong>Payment:</strong> Cash on Delivery</p>

      <p>We’ll contact you shortly to confirm delivery details.</p>

      <hr/>

      <p style="font-size:12px;color:#777">
        ENGORIZ — Built under pressure.
      </p>
    </div>
  `
}

function statusTemplate(order, status) {
  return `
    <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6">
      <h1>Your order is ${status}.</h1>

      <p><strong>Order:</strong> ${order.id}</p>
      <p><strong>Status:</strong> ${status}</p>
      <p><strong>Total:</strong> MAD ${order.total}.00</p>

      <p>You can track your order on the ENGORIZ website.</p>

      <hr/>

      <p style="font-size:12px;color:#777">
        ENGORIZ — Built under pressure.
      </p>
    </div>
  `
}

module.exports = {
  sendOrderEmail,
  orderReceivedTemplate,
  statusTemplate,
}