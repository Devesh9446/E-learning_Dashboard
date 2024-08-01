import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from "../utils/apiError.js"; 
import { apiResponse } from "../utils/apiResponse.js";
import { user } from '../models/login.model.js';

const login_user = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!(name && email && password)) {
            throw new apiError(400, "All fields required");
        }

        const check = await user.findOne({ email: email });
        if (check) {
            throw new apiError(400, "User Already Existed");
        }

        const data = new user({
            name: name,
            email: email,
            password: password
        });

        const resp = await data.save();
        res.status(200).json(new apiResponse(200, resp, "User Created Successfully"));
    } catch (error) {
        throw new apiError(400,`Error:${error.message}`)
    }
});

const signUp_user = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            throw new apiError(400, "All fields required");
        }

        const resp = await user.findOne({ email: email, password: password });

        if (!resp) {
            throw new apiError(400, "No user found");
        }

        res.status(200).json(new apiResponse(200, resp, "Login Successfully"));
    } catch (error) {
        throw new apiError(400,`Error:${error.message}`)
    }
});

const logOut_user = asyncHandler(async (req, res, next) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            throw new apiError(400, "User ID is required");
        }

        const resp = await user.findByIdAndUpdate(
            _id, 
            { logout: true }, 
            { new: true }
        );

        if (!resp) {
            throw new apiError(404, "User not found");
        }

        res.status(200).json(new apiResponse(200, resp, "Logout Successfully"));
    } catch (error) {
        next(error);
    }
});

export {
    login_user,
    signUp_user,
    logOut_user
};
