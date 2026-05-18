const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        error: 'Invalid credentials',
      })
    }

    const token = jwt.sign(
      {
        role: 'admin',
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    )

    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Server error',
    })
  }
})

router.post('/logout', (req, res) => {
  res.clearCookie('admin_token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })

  res.json({
    success: true,
  })
})

router.get('/check', (req, res) => {
  const token = req.cookies.admin_token

  if (!token) {
    return res.status(401).json({
      authenticated: false,
    })
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET)

    return res.json({
      authenticated: true,
    })
  } catch {
    return res.status(401).json({
      authenticated: false,
    })
  }
})

module.exports = router
