import {asyncHandler} from '../utils/asyncHandler.js'
import {apiError} from "../utils/apiError.js" 
import {apiResponse} from "../utils/apiResponse.js"
import {learners} from '../models/learners.model.js'
import {income} from '../models/income.model.js'

const add_learners = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, contact, course, fee } = req.body;
    if (!(name && email && contact && course && fee)) {
        throw new apiError(400, "All fields are required");
    }
    try{
        const data=new income({
            type:"student",
            income:fee,
            month:currentDate.getMonth() + 1,
            year:currentDate.getFullYear(),
        })
        await data.save();
    }catch(error){
        throw new apiError(500, `Error: ${error.message}`);
    }
    // const existingLearner = await learners.findOne({ email , course });
    // if (existingLearner) {
    //     return res.status(400).json(new apiResponse(400, {}, "User already exists"));
    // }

    try {
        const newLearner = new learners({
            name,
            email,
            contact,
            course,
            fee,
        });

        const resp = await newLearner.save();
        res.status(201).json(new apiResponse(201, resp, "Applicant registered successfully"));
    } catch (error) {
        throw new apiError(500, `Error: ${error.message}`);
    }
});

const get_learners=asyncHandler(async(req,res)=>{
    try{
        const page=parseInt(req.query.page)||1;
        const limit=parseInt(req.query.limlt)||10;
        const skip=(page-1)*limit;

        const allLearners=await learners.find().skip(skip).limit(limit);
        const totalLearners=await learners.countDocuments();
        const totalPages=Math.ceil(totalLearners/limit);

        const data={
            learners:allLearners,
            totalLearners,
            totalPages,
            currentPage:page,
            limit
        }

        res.status(200).json(new apiResponse(200,data,"Learners fetched successfully"));

    }catch(error){
        throw new apiError(500,`Error:${error.message}`);
    }
});

const delete_learners = asyncHandler(async (req, res) => {
    const { ids } = req.body; 

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new apiError(400, "IDs are required and must be an array");
    }

    try {
        const result = await learners.deleteMany({ _id: { $in: ids } });

        if (result.deletedCount === 0) {
            return res.status(404).json(new apiResponse(404, {}, "No learners found with the given IDs"));
        }

        res.status(200).json(new apiResponse(200, { deletedCount: result.deletedCount }, "Learners deleted successfully"));
    } catch (error) {
        throw new apiError(500, `Error: ${error.message}`);
    }
});

export {
    add_learners,
    get_learners,
    delete_learners
};