import {asyncHandler} from '../utils/asyncHandler.js'
import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"

const add_income=asyncHandler(async(req,res)=>{
    const {type ,income ,month}=req.body;
    if(!(type || income ||month)){
        throw new apiError(400,"")
    }
})

const get_income=asyncHandler(async(req,res)=>{

})
 
export default{
    add_income,
    get_income,

}