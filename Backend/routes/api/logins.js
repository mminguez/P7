require('dotenv').config();
const { Router } = require('express')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET


const router = Router()

router.post('/', async (req, res) => {
    const { email, password } = req.body

    try {
        // Check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Email ou mot de passe invalide' })
        }

        // Check if password is correct
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Email ou mot de passe invalide' })
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' })

        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router
