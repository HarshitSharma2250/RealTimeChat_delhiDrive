const express=require("express")
const dotenv=require("dotenv")
dotenv.config()
const connection=require("./config/db")
const UserRiutes=require("./Routes/User.routes")
const initializeSocket = require('./Socket'); // Import socket.js


// initiate server
const server=express()
const PORT=process.env.PORT||3000
const app = require('http').createServer(server);




// middleware
server.use(express.json())
server.use('/api',UserRiutes)


// initilize web socket
const io = initializeSocket(app);

// home routes
server.get("/",(req,res)=>{
    res.send(`welcome to chat application`)
})



// listen server
app.listen(PORT,async()=>{
await connection
console.log(`server is running at port ${PORT} and db is also connected`)
})