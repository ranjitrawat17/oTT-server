const express = require('express')
const app = express()

const parser = require('body-parser')
app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))

const cors = require('cors')
app.use(cors())

const log = require('morgan')
app.use(log('dev'))

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://rinku:pass123@cluster0.xzopc0o.mongodb.net/OTT?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000, () => console.log('listening...'))
    }).catch(err => console.log(err))

// -------------------- ROUTES ----------------

//LOG_IN, SIGN_UP
const userRouter = require('./routes/userRoute')
app.use(userRouter) 
