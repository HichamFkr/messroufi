const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    pseudo: String,
    email: String,
    password: String,
    balances :[
        {
            type: Schema.Types.ObjectId,
            ref: 'balance'
        }
    ]
})

//module.exports = mongoose.model('User', UserSchema)
module.exports = {UserSchema}