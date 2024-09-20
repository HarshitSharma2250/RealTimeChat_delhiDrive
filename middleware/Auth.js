const jwt=require("jsonwebtoken")
const UserSchema=require("../model/User.model")

// authmiddleware for checking authentication based on token as well
const Authdata=async(req,res,next)=>{
    const token=req.Headers["token"].slice(1)

try {
    jwt.verify(token, 'masai', async function(err, decoded) {
        if(err){
         return res.status(500).json({
             "message":err.message
         })
        }
 req.user=await UserSchema.findById(decoded.id)
       });
       next()
} catch (error) {
    res.status(500).json({
        "message":error.message
    })
} 
    }

    module.exports=Authdata