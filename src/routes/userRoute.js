const express = require('express')
const userRoute = express.Router();
const { login, sigup, signup } = require('../controllers/userController')

userRoute.post('/login', login)
userRoute.post('/signup', signup)

module.exports = userRoute;