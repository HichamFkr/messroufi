const express = require('express')
const router = express.Router()
const controller = require('../controllers/balance')

router.post('/addincome', controller.addIncome)
router.put('/updateincome/:id', controller.updateIncome)
router.delete('/deleteincome', controller.deleteIncome)


router.get('/:userId', controller.getBalance)


module.exports = router