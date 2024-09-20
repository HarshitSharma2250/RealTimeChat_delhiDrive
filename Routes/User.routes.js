const express=require("express")
const UserRoutes=express.Router()
const {Registration,Login}=require("../controllers/user.controller")
const Authdata=require("../middleware/Auth")

UserRoutes.post('/register',Registration)
UserRoutes.post('/login',Login)

module.exports=UserRoutes