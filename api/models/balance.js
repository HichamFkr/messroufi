const mongoose = require('mongoose')
const Schema = mongoose.Schema

const balanceSchema = new Schema({
    montant: Number,
    type: [String]
})

module.exports = {balanceSchema}