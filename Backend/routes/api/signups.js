const { Router } = require('express')
const User = require('../../models/User')

const router = Router()

router.post('/', async (req, res) => {
    const newUser = User(req.body)
    try {
        const User = await newUser.save()
        if (!User) throw new Error('Something went wrong saving the User')
        res.status(200).json(User)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router