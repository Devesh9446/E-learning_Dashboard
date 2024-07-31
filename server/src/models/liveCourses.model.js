import mongoose from "mongoose"

const learners_schema=new mongoose.Schema({
    startTime:{

    },
    endTime:{

    },

},{timestamps:true})

export const learners = mongoose.model("learner",learners_schema)