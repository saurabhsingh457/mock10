const nodemailer = require('nodemailer');
require("dotenv").config()

let mailFun = (req, res, next) => {
    const { email } = req.body;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.nodemail,
            pass: process.env.mailpass
        },
        tls: {
            rejectUnauthorized: false
        }

    })
    let otp=Math.floor(Math.random()*9000+1000)

transporter.sendMail({
    to:`${email}`,
    subject:"verify your account",
    html:`<p>Your otp is : ${otp}</p>`
}).then(()=>{
    console.log("mail sent successfully")
    console.log(otp)
    res.json(otp)
    next()
}).catch((err)=>{
    // console.log("err in sending mail")
    console.log(err)
    res.json({"err":err})
})
}



module.exports ={mailFun}