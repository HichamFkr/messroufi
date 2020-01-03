const User = require('../models/user')

const signUp = async (req, res)=>{
    var user = new User({
        pseudo : req.body.pseudo,
        email : req.body.email,
        password : req.body.password
    })
    await user.save()
    return res.send({user: user})
}

const logIn = async (req, res)=>{
    var user = await User.findOne({pseudo : req.body.pseudo})

    if(user.password === req.body.password){
        return res.send("sucess"+user.pseudo)
    }
}

module.exports = {signUp}
