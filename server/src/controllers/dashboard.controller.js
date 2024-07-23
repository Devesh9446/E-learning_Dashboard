import {asyncHandler} from '../utils/asyncHandler.js'
import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"

const get_income=asyncHandler(async(req,req)=>{
    const {month}=req.param
})
 
export default{
    get_income,
}