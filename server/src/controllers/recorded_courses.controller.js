import {asyncHandler} from '../utils/asyncHandler.js'
import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import {recorded_courses} from "../models/recorded_courses.model.js"

const get_course=asyncHandler(async(req,res)=>{
    const {course,link,teacher}=req.body;
    
    if(!(course && link)){
        throw new apiError(404,"All fields required");
    }

    try{
        const data=new recorded_courses({
            course,
            link,
            teacher
        })
        const resp=await data.save();
        res.status(200).json(new apiResponse(200,resp,"course fetched successfully"));
    }catch(error){
        throw new apiError(404,`error:${error.message}`);
    }
    
})

export default{
    get_course,
}