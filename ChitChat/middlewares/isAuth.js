import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import jwt from "jsonwebtoken";
import {adminSecretKey} from "../app.js"
import  {User} from "../models/user.js";
import { CHITCHAT_TOKEN } from "../constants/config.js";




// const isAuthenticated = TryCatch(async(req,res,next) => {
//     const token = req.cookies["chitchat-token"];
    
//     if(!token)
//         return next(new ErrorHandler("please login to access route",401));
//     const decodedData = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decodedData._id;
//     next();
// })


const isAuthenticated = TryCatch(async(req,res,next) => {
    const token = req.cookies[CHITCHAT_TOKEN];
    
    if(!token)
        return next(new ErrorHandler("please login to access route",401));

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedData._id);
    
    if (!user) return next(new ErrorHandler("User not found", 404));
    
    req.user = user;
    next();
});



// const AdminOnly = TryCatch(async(req,res,next) => {
//     const token = req.cookies["admin-token"];
    
//     if(!token)
//         return next(new ErrorHandler("Only Admin can Access",401));
//     const secretKey = jwt.verify(token, process.env.JWT_SECRET);
//     const  isMatch = secretKey === adminSecretKey;
//     if(!isMatch) return next(new ErrorHandler("invalid admin key", 401));


 
    
//     next();
// })


const AdminOnly = (async (req, res, next) => {
    const token = req.cookies["admin-token"];

    if (!token)
        return next(new ErrorHandler("Only Admin can Access", 401));

    const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);

    const isMatch = decoded.secret === adminSecretKey;

    if (!isMatch)
        return next(new ErrorHandler("Only Admin can Access", 401));

    next();
});

const socketAuthenticator = async (err, socket, next) => {
    try {
        if(err) return next(err);
    const authToken = socket.request.cookies[CHITCHAT_TOKEN];
    if (!authToken) return next(new ErrorHandler("Please login to access the route", 401));

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);
    const user = await User.findById(decodedData._id);
    if (!user) return next(new ErrorHandler
        ("User not found , please login to access the route", 404));
    socket.user = user;

    return next();

    } catch(error) {
        console.log(error);
        return next(new ErrorHandler("Please login to access the route", 401));
    }
};

export { isAuthenticated, AdminOnly, socketAuthenticator }




