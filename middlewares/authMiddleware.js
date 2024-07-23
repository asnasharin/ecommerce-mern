const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

 export const protect = asyncHandler(
    async(req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                req.user = decoded;
                next();
            } catch (error) {
                console.log(error)
            } 
        }
    }
 )