import {asyncHandler} from '../utils/asyncHandler.js'
import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import {income} from "../models/income.model.js"

const get_income=asyncHandler(async(req,res)=>{
    const {year}=req.body;
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


export {
    get_income,

}