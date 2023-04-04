const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const exist = await userModel.findOne({ email })

            if (!exist) {
                res.json({ err: "Not Exist" })
            }

            const matchPassword = await bcrypt.compare(password, exist.password)
            if (!matchPassword) {
                return res.json({ err: 'Invalid Details' })
            }

            const token = jwt.sign({ email: exist.email, id: exist.__id }, 'CODE_RAWAT')
            res.status(200).json({ user: exist, token })
        } catch (error) {
            console.log("error : " + error)
            res.json({ err: "error occured" })
        }
    },

    signup: async (req, res) => {
        const { email, username, password } = req.body;
        console.log(email + ':' + username + ':' + password)

        try {
            const exist = await userModel.findOne({ email })

            if (exist) {
                return res.json({ err: "Already  existed" })
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            console.log('here i am')
            const result = await userModel.create({
                username,
                email,
                password: hashedPassword,
                admin: false,
                premium: false
            })

            const token = jwt.sign({ email: result.email, id: result.__id }, 'CODE_RAWAT')
            res.status(200).json({ user: result, token })

        } catch (error) {
            console.log("error : " + error)
            res.json({ err: "error occured" })
        }
    }
}