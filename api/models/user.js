const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    pseudo: String,
    email: String,
    password: String
})

//module.exports = mongoose.model('User', UserSchema)
module.exports = {UserSchema}