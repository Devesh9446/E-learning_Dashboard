import mongoose from 'mongoose'

const income_Schema=new mongoose.Schema({
    type:{
        type:String,
        required:true,
    },
    income:{
        type:Number,
        required:true,
    },
    month:{ 
        type:String,
        required:true,
    }
},{timestamps:true})

const income=mongoose.model("income",income_Schema)