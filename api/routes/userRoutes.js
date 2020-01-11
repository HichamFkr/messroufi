const express = require('express')
const router = express.Router()

const controller = require('../controllers/user')
router.post('/signup', controller.signUp)
router.post('/signin', controller.signIn)
router.get('/users', controller.get_users)
router.post('/:userId/adduserbalance', controller.addUserBalance)
router.get('/:userId/getbalances',controller.getBalances)
router.get('/:userId/getoutcomes',controller.getOutcomes)
router.get('/:userId/getincomes',controller.getIncomes)
router.patch('/:userId/updateuser', controller.updateUser)
router.delete('/:userId/deleteuser', controller.deleteUser)

module.exports = router