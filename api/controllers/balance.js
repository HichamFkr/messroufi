const mongoose = require('mongoose')
const balanceSchemaFile = require('../models/balance')
const Balance = mongoose.model('balances', balanceSchemaFile.balanceSchema)

const addIncome = (req, res)=>{
    const balance = new Balance({
        montant : req.body.montant,
        type : [req.body.type]
    })

    balance.save((err, montant)=>{
        if (err) return res.status(500).send("Error")
        res.send(montant)
    })
    return res.send ("sucess")
}

const updateIncome = (req, res)=>{
    const balance= Balance.findOneAndUpdate({_id: req.params.id},
         {"montant": req.body.montant},
          {new: true} 
    )

    Balance.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        (err, balance)=>{
            if (err) res.send(err)
            res.send(balance)
        }  
    )

}

const deleteIncome = (req, res)=>{
    

}

const addOutcome = (req, res)=>{
    return res.send ("sucess")

}

const updateOutcome = (req, res)=>{
    return res.send ("sucess")

}

const deleteOutcome = (req, res)=>{
    return res.send ("sucess")

}

const getBalance = (req, res)=>{
    var balanceMap = {}
    Balance.find({}, (err, balances)=>{
        
        balances.forEach((balance)=>{
            balanceMap[balance._id] = balance
        })
        res.send(balanceMap)
    })
}

module.exports = {addIncome, updateIncome, deleteIncome, addOutcome, updateOutcome, deleteOutcome, getBalance}