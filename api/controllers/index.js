const mongoose = require('mongoose')
const UserSchema = require('../models/user')
const User = mongoose.model('users', UserSchema)  


const signUp = async (req, res)=>{
    var user = new User({
        pseudo : req.body.pseudo,
        email : req.body.email,
        password : req.body.password
    })
    await user.save()
    return res.send({user: user})
}

const signIn = async (req, res)=>{
    console.log("req  "+req.body.password)
    var user = await User.findOne({pseudo: req.body.pseudo}, (err, user)=>{
        return res.send("****** "+user)
    })

   
    // if(user.password === req.body.password && user.pseudo === req.body.pseudo){
    //     return res.send("sucess__ "+req.body.pseudo)
    // }
}

const get_users = (req, res)=>{
    User.find({}, function(err, users) {
        var userMap = {};
    
        users.forEach(function(user) {
          userMap[user._id] = user;
        });
    
        res.send(userMap);  
      })
}

module.exports = {signUp, signIn, get_users}
