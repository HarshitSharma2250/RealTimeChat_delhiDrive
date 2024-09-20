const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{type:String,required:true,minlength:[2,"length should be more than two"]},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    number:{type:Number,required:true,length:[10,"check you number again please wrote valid number"]},
    password:{type:String,required:true,minlength:[6,"password should not less then 6"]}
},{
    versionKey:false,
    timestamp:true
})

const userModel=mongoose.model("user",userSchema)
module.exports=userModel