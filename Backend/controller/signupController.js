const User = require('../models/User')
const bcrypt = require('bcryptjs')

async function signupController(req, res) {
  const { email, password } = req.body
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'L\'adresse email n\'est pas valide' })
  }

  try {
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'L\'utilisateur existe déjà' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({ email, password: hashedPassword })
    const savedUser = await newUser.save()

    if (!savedUser) {
      throw new Error('Quelque chose s\'est mal passé lors de l\'enregistrement de l\'utilisateur')
    }

    res.status(200).json(savedUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = signupController