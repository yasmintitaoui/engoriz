const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization

    const token =
      authHeader?.startsWith('Bearer ')
        ? authHeader.replace('Bearer ', '')
        : req.cookies?.admin_token

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    jwt.verify(token, process.env.JWT_SECRET)

    next()
  } catch (error) {
    console.error('Admin auth error:', error.message)

    return res.status(401).json({ error: 'Invalid token' })
  }
}