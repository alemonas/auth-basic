const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const createToken = (user) => {
  if (!user.role) {
    throw new Error('No user role specified')
  }

  return jwt.sign(
    {
      sub: user._id,
      email: user.email,
      role: user.role,
      iss: 'api.auth.basic',
      aud: 'api.auth.basic',
    },
    process.env.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '1h',
    }
  )
}

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    // generate a salt at lever 12 strength
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err)
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err)
        }
        resolve(hash)
      })
    })
  })
}

const verifyPassword = (passwordAttempt, hashedPassword) => {
  return bcrypt.compare(passwordAttempt, hashedPassword)
}

const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'There was a problem authorizin the request',
    })
  }
  if (req.user.role !== 'admin') {
    return res.status(401).json({message: 'Insufficient role'})
  }
  next()
}

module.exports = {
  createToken,
  hashPassword,
  verifyPassword,
  requireAdmin,
}
