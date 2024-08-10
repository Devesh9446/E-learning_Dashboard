import mongoose from "mongoose"

const live_course_schema=new mongoose.Schema({
    startTime:{

    },
    endTime:{

    },

},{timestamps:true})

export const live_course = mongoose.model("learner",live_course_schema)