const { Router } = require('express')
const router = Router()
const { loginController } = require('../../controller/loginController')

router.post('/', loginController)

module.exports = router