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
                    jwt.sign({user: user}, 'secretkey', {expiresIn: '1h'}, (err, token)=>{
                        res.status(200).json({
                            token: token,
                            user: user.pseudo
                        })
                    })
 
                }else{
                    res.status(401).send("please check your pseudo or password ")
                }
            }
            else{
                res.send("user not found")
            }
        }
    })
}



const get_users = async (req, res)=>{
    const users = await User.find().populate('balances')
    res.status(201).json(users)
}


const addUserBalance = async (req, res)=>{

        jwt.verify(req.token, 'secretkey', (err, authData)=>{
        if (err){
            res.status(403).json("Forbidden")
        }else{
            //get user 
            // const {userId} = req.params
            // const user =  User.findById(userId)
            const user = authData.user
            //create new balance
            const newBalance = new Balance(req.body)
            //assign the user as an owner
            newBalance.user = user
           
            //save the balance
            newBalance.save()
            //add the balance to the user balances array 'balances'
            user.balances.push(newBalance)
            //save the user 
            user.save() //=============== PROBLEM in here
            return res.status(201).json({
                user,
                newBalance
            })
            
        }
    })


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


function verifyToken (req, res, next){
    const bearerHeader = req.headers['authorization']

    if (typeof(bearerHeader)!== 'undefined'){
        const token = bearerHeader.split(' ')[1]
        req.token = token
        next()
    }else{
        res.status(403).json({
            msg: 'Forbidden'
        })
    }
}

module.exports = {signUp, signIn, get_users, addUserBalance, getBalances, getOutcomes, getIncomes, updateUser, deleteUser, verifyToken}
