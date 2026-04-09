

import { envMode } from "../app.js";


const errorMiddleware = (err, req, res, next) => {
    err.message ||= "Internal Server Error";
    err.statusCode ||= 500;

    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern).join(", ");
        err.message = `This username alreay exists: ${field}`;
        err.statusCode = 400;
    }

    if(err.namee==="CastError") {
        const errorPath=err.path;
        err.message=`invalid id passing in path pass correct id error in id ${errorPath}`;
        err.statusCode = 400;

    }

    console.log("Error Middleware Hit:", err.message);
    
    
    const response = {
        success: false,
        message: err.message,
    };

    if(envMode === "DEVELOPMENT") {
        response.error = err;
    }

    return res.status(err.statusCode).json(response);
    
};



 const TryCatch = (passedFunc) => async (req,res,next) => {

    try{
        await passedFunc(req, res, next);

    } catch(error) {
        next(error)
    }
 };

 export { errorMiddleware, TryCatch };