const express = require('express')
const colors = require('colors')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()


const bodyParser = require('body-parser');

const  User  = require('./model/User');

app.use(bodyParser.json());
const authRoutes = require('./routes/authRoutes')
app.use(authRoutes)


app.get('/', (req,res) => {
    res.send('welcome to home page')
})





mongoose.connect(process.env.mongo, 
    err =>  {
        if(err) throw err
        console.log('database connected')
        
     });

port = 7000
app.listen(port, (req,res) => {
    console.log(`server run in ${port}`.underline)
})