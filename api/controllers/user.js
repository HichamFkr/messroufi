const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchemaFile = require('../models/user')
const User = mongoose.model('users', UserSchemaFile.UserSchema)  

const BalanceSchemafFile = require('../models/balance')
const Balance = mongoose.model('balances', BalanceSchemafFile.balanceSchema)


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

const addUserBalance = async (req, res)=>{
    //get user 
    const {userId} = req.params
    const user = await User.findById(userId)
    //create new balance
    const newBalance = new Balance(req.body)
    //assign the user as an owner
    newBalance.user = user
    // //save the balance
    await newBalance.save()
    // // add the balance to the user balances array 'balances'
    user.balances.push(newBalance)
    // //save the user 
    await user.save()
    return res.status(201).json(newBalance)
}

const getBalances = async (req, res)=>{
    const {userId} = req.params
    const user = await User.findById(userId).populate('balances')
    res.status(201).json(user.balances)
}

const getOutcomes = async (req, res)=>{
    const {userId} = req.params
    const user = await User.findById(userId).populate('balances')
    let outcomes = []

    user.balances.forEach((outcome)=>{
        if (outcome.type == 'd'){
            console.log(outcome)
            outcomes.push(outcome)
        }
    })

    res.status(201).json(outcomes)
}

const getIncomes = async (req, res)=>{
    const {userId} = req.params
    const user = await User.findById(userId).populate('balances')
    let incomes = []

    user.balances.forEach((income)=>{
        if (income.type == 'r'){
            console.log(income)
            incomes.push(income)
        }
    })

    res.status(201).json(incomes)
}

const updateUser = async (req, res)=>{
    const {userId} = req.params
    const newUSer = req.body
    const user = await User.findByIdAndUpdate(userId, newUSer)
    res.send({sucess: true,user: user})
}

const deleteUser = async (req, res)=>{
    const {userId} = req.params
    await User.findByIdAndDelete(userId)
    res.send({sucess: true})
}
module.exports = {signUp, signIn, get_users, addUserBalance, getBalances, getOutcomes, getIncomes, updateUser, deleteUser}
