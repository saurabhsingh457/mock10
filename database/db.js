const mongoose=require('mongoose');

const connection =mongoose.connect("mongodb+srv://saurabh:singh@cluster0.r2cx1dw.mongodb.net/chatsapp?retryWrites=true&w=majority")

module.exports={connection}