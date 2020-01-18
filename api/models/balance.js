const mongoose = require('mongoose')
const Schema = mongoose.Schema

const balanceSchema = new Schema({
    montant: Number,
    type: [String],
    user : {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    // tags: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'tag'
    // }
})

module.exports = {balanceSchema}