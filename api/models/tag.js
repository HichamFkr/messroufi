const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema({
    name: String,
    color: String,
    balance :[
        {
            type: Schema.Types.ObjectId,
            ref: 'balance'
        }
    ]
})

module.exports = {TagSchema}