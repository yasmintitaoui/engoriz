const express = require('express')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const router = express.Router()
const FALLBACK_ADMIN_USERNAME = 'engorizadmin'
const FALLBACK_ADMIN_PASSWORD = '@EngorizAdmin!2026'

const getConfiguredUsername = () => process.env.ADMIN_USERNAME?.trim() || FALLBACK_ADMIN_USERNAME
const getConfiguredPassword = () => process.env.ADMIN_PASSWORD?.trim() || FALLBACK_ADMIN_PASSWORD

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const configuredUsername = getConfiguredUsername()
    const configuredPassword = getConfiguredPassword()

    if (
      username?.trim() !== configuredUsername ||
      password?.trim() !== configuredPassword
    ) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { username: username.trim() },
      process.env.JWT_SECRET || 'engoriz-local-dev-secret',
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