const express = require('express')
const app = express()

const userRoutes = require('./api/routes/userRoutes')


const mongoose = require('mongoose')

const bodyparser = require("body-parser")
app.use(bodyparser())


mongoose.connect("mongodb://localhost:27017/tc_messroufi", (err)=>{
    console.log(err)
})

app.use('/', userRoutes)

app.listen(3000, ()=>{
    console.log("server is running")
})