const express=require('express')
const app = express()
app.use(express.json())
const cors=require('cors')
app.use(cors({
    origin:"*"
}))
const {connection}=require("./database/db")


app.get("/",(req,res)=>{
    res.send("welcome to chat app")
})
const {userRouter}=require("./Routes/user.route")
app.use("/user",userRouter)


app.listen(4500,async()=>{
    try {
        await connection
        console.log("connected to database")
    } catch (error) {
        console.log(error)
    }
    console.log("listening on port 4500")
})