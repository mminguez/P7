const User = require('../models/User')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET
const bcrypt = require('bcryptjs')

async function loginController(req, res) {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe invalide' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe invalide' })
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' })
    userId = user._id

    res.status(200).json({ token, userId })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { loginController }
