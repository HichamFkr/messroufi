const express = require('express')
const router = express.Router()
const controller = require('../controllers/balance')

router.use('/addincome', controller.addIncome)
router.use('/updateincome', controller.updateIncome)
router.use('/deleteincome', controller.deleteIncome)
router.use('/addoutcome', controller.addOutcome)
router.use('/updateoutcome', controller.updateOutcome)
router.use('/deleteoutcome', controller.deleteOutcome)

module.exports = router