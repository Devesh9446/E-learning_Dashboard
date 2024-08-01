import mongoose from 'mongoose'

const user_Schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:Number,
        required:true,
    },
    password:{ 
        type:String,
        required:true,
    },
    confirm_password:{ 
        type:String,
        required:true,
    },
    logout:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})

export const user=mongoose.model("user",user_Schema)