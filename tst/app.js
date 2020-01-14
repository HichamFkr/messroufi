const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/', (req, res)=>{
    res.json({
        msg: 'sucess'
    })
})



app.post('/posts',verifyToken ,(req, res)=>{
    
    jwt.verify(req.token, 'secretkey', (err,authData)=>{
        if(err){
            res.status(403).json({
                msg: 'Forbidden'
            })
        }else{
            console.log('successssss')
            res.json({
                msg: 'post created ...',
                authData: authData
            })
        }
    })
    
})

app.post('/login', (req, res)=>{
    const user = {
        id: 1, 
        username: 'brad',
        email: 'brad@gmail.com'
      }
    
    jwt.sign({user: user}, 'secretkey', {expiresIn: '1h'}, (err, token)=>{
        res.json({
            token: token
        })
    })

})


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


app.listen(5000, ()=>console.log('server is running at 5000'))