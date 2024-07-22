import {asyncHandler} from '../utils/asyncHandler.js'
import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import {learners} from '../models/learners.model.js'

const add_learners = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, contact, course, fee } = req.body;

    if (!(name && email && contact && course && fee)) {
        throw new apiError(400, "All fields are required");
    }

    const existingLearner = await learners.findOne({ email });
    if (existingLearner) {
        return res.status(400).json(new apiResponse(400, {}, "User already exists"));
    }

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

        res.status(200).json(new apiResponse(200,{
            learners:allLearners,
            totalLearners,
            totalPages,
            currentPage:page,
            limit

        },"Learners fetched successfully"));

    }catch(error){
        throw new apiError(500,`Error:${error.message}`);


    }
});
export{
    add_learners,
    get_learners,
}