const express = require('express')
const app = express()



const mongoose = require('mongoose')

//routes 
const userRoutes = require('./api/routes/userRoutes')
const balanceRoutes = require('./api/routes/balanceRoutes')

const bodyparser = require("body-parser")
app.use(bodyparser())


mongoose.connect("mongodb://localhost:27017/tc_masroufi", (err)=>{
    console.log(err)
})


app.use('/', userRoutes)
app.use('/balance', balanceRoutes)

app.listen(3000, ()=>{
    console.log("server is running")
})