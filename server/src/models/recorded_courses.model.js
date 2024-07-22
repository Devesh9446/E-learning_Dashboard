import mongoose from 'mongoose'

const course_schema=new mongoose.Schema({
    course:{
        type:String,
        required:true,
    },
    teacher:{
        type:String,
    },
    link:{
        type:String,
        required:true,
    },
},{timestamps:true})

export const recorded_courses= mongoose.model("course",course_schema)