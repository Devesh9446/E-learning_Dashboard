import mongoose from "mongoose"

const learners_schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    contact:{
        type:Number,
        requireed:true,
    },
    course:{
        type:String,
        required:true,
    },
    fee:{
        type:Number,
        required:true,
    },
    month:{
        type:String,
        required:true,
    },

},{timestamps:true})

export const learners = mongoose.model("learners",learners_schema)