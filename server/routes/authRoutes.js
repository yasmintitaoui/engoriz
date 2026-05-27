const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (
      username?.trim() !== process.env.ADMIN_USERNAME ||
      password?.trim() !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    return res.json({
      success: true,
      token,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error' })
  }
})

router.get('/check', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ authenticated: false })
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET)
    return res.json({ authenticated: true })
  } catch {
    return res.status(401).json({ authenticated: false })
  }
})

module.exports = router