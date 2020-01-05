const mongoose = require('mongoose')
const UserSchemaFile = require('../models/user')
const User = mongoose.model('users', UserSchemaFile.UserSchema)  


const signUp = async (req, res)=>{
    const newUser = new User(req.body)
    //console.log('newUSer '+newUser)
    newUser.save((err, user)=>{
        if (err) res.send(err)
        res.json(user)
    })
    //console.log('newUSer '+newUser)
}

const signIn = async (req, res)=>{
    var user = await User.findOne({pseudo: req.body.pseudo}, (err, user)=>{
        if(user.password === req.body.password && user.pseudo === req.body.pseudo){
                return res.send("Welcome "+req.body.pseudo)
        }
    })
    
}

const get_users = (req, res)=>{
    User.find({}, (err, users)=> {
        var userMap = {}
    
        users.forEach((user) =>{
          userMap[user._id] = user;
        });
    
        res.send(userMap);  
      })
}

module.exports = {signUp, signIn, get_users}
