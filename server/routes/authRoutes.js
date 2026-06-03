const express = require('express')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

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
      { username: username.trim() },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    return res.json({ token })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error' })
  }
})

router.get('/check', auth, (req, res) => {
  return res.json({ ok: true })
})

module.exports = router