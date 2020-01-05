const mongoose = require('mongoose')
const balanceSchemaFile = require('../models/balance')
const Balance = balanceSchemaFile.balanceSchema

const addIncome = (req, res)=>{
    return res.send ("sucess")
}

const updateIncome = (req, res)=>{
    return res.send ("sucess")

}

const deleteIncome = (req, res)=>{
    return res.send ("sucess")

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
    return res.send("sucess")
}

module.exports = {addIncome, updateIncome, deleteIncome, addOutcome, updateOutcome, deleteOutcome}