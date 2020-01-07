const express = require('express')
const router = express.Router()
const controller = require('../controllers/balance')

router.post('/addincome', controller.addIncome)
router.put('/updateincome/:id', controller.updateIncome)
router.delete('/deleteincome', controller.deleteIncome)
router.post('/addoutcome', controller.addOutcome)
router.put('/updateoutcome', controller.updateOutcome)
router.use('/deleteoutcome', controller.deleteOutcome)

router.get('/', controller.getBalance)


module.exports = router