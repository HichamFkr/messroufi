const express = require('express')
const router = express.Router()

const controller = require('../controllers/user')
router.post('/signup',controller.signUp)
router.post('/signin', controller.signIn)
router.get('/users', controller.get_users)
router.post('/adduserbalance',controller.verifyToken, controller.addUserBalance)
// router.get('/getbalances',controller.getBalances)
router.get('/:userId/getbalances',controller.getBalances)
router.get('/getoutcomes',controller.verifyToken,controller.getOutcomes)
router.get('/getincomes',controller.verifyToken,controller.getIncomes)
router.patch('/updateuser',controller.verifyToken, controller.updateUser)
router.delete('/deleteuser',controller.verifyToken, controller.deleteUser)

module.exports = router