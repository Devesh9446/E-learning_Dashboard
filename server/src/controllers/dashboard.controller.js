import {asyncHandler} from '../utils/asyncHandler.js'
import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import {income} from "../models/income.model.js"
import {recorded_courses} from "../models/recorded_courses.model.js"
import {learners} from "../models/learners.model.js"
import {teachers} from "../models/teachers.model.js"

const get_income=asyncHandler(async(req,res)=>{
    const {year}=req.params;
    if(!(year)){
        throw new apiError(400,"Month and year is required");
    }
    try{
        const student_data=await income.find({type:"student",year:year});
        const teacher_data=await income.find({type:"teacher",year:year});

        try{
            const data={
                student_income:student_data,
                teacher_income:teacher_data,
            }

            res.status(200).json(new apiResponse(200,data,"Income send Successfully"));

        }catch(error){
            throw new apiError(400,`ERROR:${error.message}`)
        }

    }catch(error){
        throw new apiError(400,`ERROR:${error.message}`)
    }
})

const dashboard_details=asyncHandler(async(req,res)=>{ 
    
    try{
        const total_learners=await learners.countDocuments();
        const total_teachers=await teachers.countDocuments();
        const total_courses=await recorded_courses.countDocuments();
    
        const data={
            learners:total_learners,
            teachers:total_teachers,
            courses:total_courses
        }
          
        res.status(200).json(new apiResponse(200,data,"dashboard data send successfully"))
    }catch(error){
        throw new apiError(404,`error:${error.message}`);
    }
})

export {
    get_income,
    dashboard_details  
}