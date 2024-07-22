import {asyncHandler} from '../utils/asyncHandler.js'
import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import {learners} from '../models/learners.model.js'

const add_learners=asyncHandler(async(req,res)=>{
    console.log(req.body);
    const {name,email,contact,course,fee}=req.body;
    if(!(name && email && contact && course && fee)){
        throw new apiError(404,"all fields required");
    }

    const data=await learners.find({email:email})
    if(!data){
        res.status(400).json(new apiResponse(400,{},"user already exists"))
    }

    const  application=new learners({
        name,
        email,
        contact,
        course,
        fee,
    })
    try{
        const resp=await new application.save();
        res.status(200).json(new apiResponse(200,resp,"Applicant registered successfuly"));
    }catch(error){
        throw new apiError(404,`error:${error.message}`) ;
    }

})

export {
    add_learners,
}