const { Router } = require('express')
const User = require('../../models/User')

const router = Router()

router.post('/', async (req, res) => {
    const { email, password } = req.body
    try {
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: 'L\'utilisateur existe déjà' })
        }

        const newUser = new User({ email, password })
        const savedUser = await newUser.save()
        if (!savedUser) {
            throw new Error('Quelque chose s\'est mal passé lors de l\'enregistrement de l\'utilisateur')
        }

        res.status(200).json(savedUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router