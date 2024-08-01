import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { recorded_courses } from "../models/recorded_courses.model.js";

const get_course = asyncHandler(async (req, res) => {
    try {
        const courses = await recorded_courses.find();
        res.status(200).json(new apiResponse(200, courses, "Course fetched successfully"));
    } catch (error) {
        throw new apiError(404, `Error: ${error.message}`);
    }
});

const create_course = asyncHandler(async (req, res) => {
    const { course, link, teacher } = req.body;

    const course_image_Path=req.files?.course_image[0]?.path
    if(!course_image_Path){
        throw new apiError(400,"course_image is required")
    }
    console.log("course_image path:",course_image_Path)
    const course_image=await uploadOnCloudinary(course_image_Path) 
    if(!course_image){
        throw new apiError(400,"course_image is requied")
    }

    if (!(course && link)) {
        throw new apiError(404, "All fields required");
    }

    try {
        const data = new recorded_courses({
            course,
            link,
            teacher
        });
        const resp = await data.save();
        res.status(200).json(new apiResponse(200, resp, "Course created successfully"));
    } catch (error) {
        throw new apiError(404, `Error: ${error.message}`);
    }
});

export {
    get_course,
    create_course
};
