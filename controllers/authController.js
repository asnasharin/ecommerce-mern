import asyncHandler from 'express-async-handler';
import userModel from '../models/userModel';
import jwt from 'jsonwebtoken';

// jwt creating token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
};

// register controller
export const RegisterController = asyncHandler(
    async (req, res, next) => {
        const { email, password, name } = req.body;
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            res.status(409);
            return next(new Error("Email already exists"));
        }
        
        const newUser = await userModel.create({
            name,
            password,
            email
        });

        const token = createToken(newUser._id);
        res.status(200).json({
            success: true,
            message: "User created successfully",
            token,
            user: {
                _id: newUser._id,
                email: newUser.email,
                name: newUser.name
            },
        });
    }
);
