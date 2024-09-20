const UserSchema=require("../model/User.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// user registration ----------
const Registration=async(req,res)=>{
    const{name,email,number,password}=req.body
try {
    bcrypt.hash(password, 10,async function(err, hash) {
     if(err){
        return res.status(500).json({
            message:err.message
        })
     }

const senddata=new UserSchema({name,email,password:hash,number})
   await senddata.save()
res.status(201).json({
    message:"user register successfully"
})
    });
} catch (error) {
    res.status(500).json({
        message:error.message
    })
}
}

// user login-----------------
const Login=async(req,res)=>{
    const{email,password}=req.body
    try {
        const isuser=await UserSchema.findOne({email})
        if(!isuser){
return res.status(404).json({
    "message":"invalid credentials"
})
        }

        bcrypt.compare(password, isuser.password, async function(err, result){
            if(err){
                return res.status(500).json({
                    "message":err.message
                })
            }
            if(!result){
                res.status(500).json({
                    message:"something error while checking credentials "
                })
            }
            const token = jwt.sign({id:isuser._id }, 'masai',{expiresIn:"1h"})

            res.status(201).json({
                "message":"user loged in successfully",
                userdetails:{
                    token:token,
                    name:isuser.name,
                    email:email
                }
            })
        })

    } catch (error) {
        res.status(500).json({
            "message":error.message
        })
    }
}

module.exports={Registration,Login}