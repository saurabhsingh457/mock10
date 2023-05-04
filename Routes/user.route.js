const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()


const cookieParser = require('cookie-parser');

const { UserModel } = require("../model/user.model");




const userRouter = express.Router()
userRouter.use(cookieParser())

const { mailFun } = require("../middleware/mail")
userRouter.post("/otp", mailFun, async (req, res) => {
    // const { name, email, pass } = req.body
    // const user = await UserModel.findOne({ email })
    // if (user) {
    //     res.json("already exists")
    // } else {
    //     res.json("otp generated")
    // }
})


userRouter.post("/signup", async (req, res) => {
    try {
       
        const { name, pass, email, otp } = req.body
       
        const already = await UserModel.findOne({ email })
        console.log(already)
        if (already) {
            res.json("user already exists")
        }
        else {
                bcrypt.hash(pass, 5, async (err, hashpass) => {
                    if (err) {
                        res.json("error while hashing password")
                    } else {
                        const user = await UserModel.insertMany({ name, pass: hashpass, email })
                        // user.save()
                        res.json("registered successfully")
                     
                    }
                })
            
        }
    } catch (error) {
        console.log(error)
    }
})
userRouter.post("/login", async (req, res) => {
    const { name, pass, email } = req.body
    const user = await UserModel.findOne({ email })
    if (!user) {
        res.json({ "msg": "user does not exist" })
    } else {
        bcrypt.compare(pass, user.pass, async (err, result) => {
            if (err) {
                res.json({ "msg": "wrong credential" })
            } else {
                if (result) {
                    var normaltoken = jwt.sign({ userId: user._id }, process.env.normalkey);
                    res.json({ "msg": "logged in successfully"})

                } else {
                    res.json({ "msg": "wrong credential" })
                }
            }
        })
    }
})


module.exports={userRouter}