// controllers/teachers.controller.js
import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import  teachers  from '../models/teachers.model.js';
import { income } from '../models/income.model.js';

const add_teacher = asyncHandler(async (req, res) => {
    const { name, email, contact, subject, salary } = req.body;
    if (!(name && email && contact && subject && salary)) {
        throw new apiError(400, "All fields are required");
    }

    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    if (!(month && year)) {
        throw new apiError(404, "Month and year Required");
    }

    try {
        const data = new income({
            type: "teacher",
            income: salary,
            month: month,
            year: year,
        });
        await data.save();
    } catch (error) {
        throw new apiError(400, `Error: ${error.message}`);
    }

    try {
        const newTeacher = new teachers({
            name,
            email,
            contact,
            subject,
            salary,
        });

        const resp = await newTeacher.save();
        res.status(201).json(new apiResponse(201, resp, "Teacher registered successfully"));
    } catch (error) {
        throw new apiError(500, `Error: ${error.message}`);
    }
});

const get_teachers = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const allTeachers = await teachers.find().skip(skip).limit(limit);
        const totalTeachers = await teachers.countDocuments();
        const totalPages = Math.ceil(totalTeachers / limit);

        const data = {
            teachers: allTeachers,
            totalTeachers,
            totalPages,
            currentPage: page,
            limit,
        };

        res.status(200).json(new apiResponse(200, data, "Teachers fetched successfully"));
    } catch (error) {
        throw new apiError(500, `Error: ${error.message}`);
    }
});

const delete_teachers = asyncHandler(async (req, res) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new apiError(400, "IDs are required and must be an array");
    }

    try {
        const result = await teachers.deleteMany({ _id: { $in: ids } });

        if (result.deletedCount === 0) {
            return res.status(404).json(new apiResponse(404, {}, "No teachers found with the given IDs"));
        }

        res.status(200).json(new apiResponse(200, { deletedCount: result.deletedCount }, "Teachers deleted successfully"));
    } catch (error) {
        throw new apiError(500, `Error: ${error.message}`);
    }
});

const update_teacher = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, contact, subject, salary } = req.body;

    if (!(name && email && contact && subject && salary)) {
        throw new apiError(400, "All fields are required");
    }

    try {
        const updatedTeacher = await teachers.findByIdAndUpdate(
            id,
            { name, email, contact, subject, salary },
            { new: true, runValidators: true }
        );

        if (!updatedTeacher) {
            return res.status(404).json(new apiResponse(404, {}, "Teacher not found"));
        }

        res.status(200).json(new apiResponse(200, updatedTeacher, "Teacher updated successfully"));
    } catch (error) {
        throw new apiError(500, `Error: ${error.message}`);
    }
});

export {
    add_teacher,
    get_teachers,
    delete_teachers,
    update_teacher,
};
