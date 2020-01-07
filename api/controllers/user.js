const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchemaFile = require('../models/user')
const User = mongoose.model('users', UserSchemaFile.UserSchema)  


const signUp = async (req, res)=>{

    const newUSer = new User ({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })

    newUSer.save((err, user)=>{
        if (err) return res.status(500).send("Error of registration")
        res.send(user)
    })

}

const signIn = async (req, res)=>{
    const user = await User.findOne({pseudo: req.body.pseudo}, (err, user)=>{
        if (err) {
            res.status(500).send('Internal server error')
        }else{
            if(user){
                if(bcrypt.compareSync(req.body.password, user.password) && (req.body.pseudo === user.pseudo)){
                    res.status(200).send(user.pseudo)
                }else{
                    res.status(401).send("please check your pseudo or password ")
                }
            }
            else{
                res.send("user npt found")
            }
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
