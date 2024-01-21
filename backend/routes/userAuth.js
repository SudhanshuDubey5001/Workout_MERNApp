const express = require('express')
const { user_login, user_signup } = require('../controller/userController')

const router = express.Router()

//login route
router.post('/login', user_login)

//signup route
router.post('/signup', user_signup)

module.exports = router;