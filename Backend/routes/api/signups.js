const { Router } = require('express')
const router = Router()
const signupController = require('../../controller/signupController')

router.post('/', signupController)

module.exports = router