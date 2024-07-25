import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import userModel from '../models/userModel'

// protected route
 export const protect = asyncHandler(
    async(req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];

        if(!token) {
            res.status(401);
            return next(new Error("NOt authorised, no token provided"));
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await userModel.findById(decode.userId);

            if(!user) {
                res.status(401);
                return next(new Error("Unauthorised user"));
            }
            req.user = user
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            next(new Error("Not authorised, token failed"))
        }
    }
 );

//  admin access
export const isAdmin = asyncHandler(
    async (req, res, next) => {
        try {
            const user = await userModel.findById(req.user._id);

            if (!user || user.role !== 1) {
                return res.status(401).send({
                    success: false,
                    message: "Unauthorised Access",
                });
            } else {
                next();
            }
        } catch (error) {
            console.log(error);
            res.status(401).send({
                success: false,
                error,
                message: "Error in admin middleware"
            });
        }
    }
);