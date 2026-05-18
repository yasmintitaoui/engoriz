const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  try {
    const token = req.cookies.admin_token

    if (!token) {
      return res.status(401).json({
        error: 'Unauthorized',
      })
    }

    jwt.verify(token, process.env.JWT_SECRET)

    next()
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid token',
    })
  }
}
