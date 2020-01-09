const express = require('express')
const router = express.Router()

const controller = require('../controllers/user')
router.post('/signup', controller.signUp)
router.post('/signin', controller.signIn)
router.get('/users', controller.get_users)
router.post('/:userId/adduserbalance', controller.addUserBalance)

module.exports = router