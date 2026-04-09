import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {v4 as uuid} from "uuid";
import { v2 as cloudinary} from "cloudinary";
import { getBase64, getSockets } from "../lib/helper.js";
import { NEW_MESSAGE } from "../constants/events.js";
import { memoryStorage } from "multer";

// const cookieOption = {
    
//         maxAge: 15 * 24 * 60 * 60 * 1000,
//         sameSite: "none",
//         httpOnly: true,
//         secure: true,
      
// }


const cookieOption = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
  httpOnly: true,
  secure: process.env.NODE_ENV !== "DEVELOPMENT", // false on localhost
};

const connectDB = (uri) => {
    mongoose
    .connect(uri, {dbname: "ChitChaty"})
    .then((data) => 
        console.log(`connected to DB : ${data.connection.host}`))
    .catch((err) => {
        throw err;
    })
};

const sendToken = (res, user, code, message) => {

    const token = jwt.sign({_id: user._id},
         process.env.JWT_SECRET);

    return res.status(code).cookie
    ("chitchat-token", 
      token,
      cookieOption
      ).json({
        success: true,
        user, 
        message,
       
    });

};

const emitEvent = (req, event, users, data) => {
  const io = req.app.get("io");
  const usersSocket = getSockets(users);
  io.to(usersSocket).emit(event, data);

  
};



const uploadFilesToCloudinary = async (files = []) => {
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          getBase64(file),
          {
            resource_type: "auto",
            public_id: uuid(),
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error); // 👈 LOG IT
              return reject(error);
            }
            resolve(result);
          }
        );
      });
    });
  
    try {
      const results = await Promise.all(uploadPromises);
      return results.map((result) => ({
        public_id: result.public_id,
        url: result.secure_url,
      }));
    } catch (err) {
      console.error("Caught Cloudinary Upload Error:", err); // 👈 LOG IT
      throw new Error("Error uploading files to Cloudinary: " + err.message);
    }
  };
  


const deleteFilesFromCloudinary = async(public_ids) => {
    //delete files from cloudinary
}

export { connectDB, sendToken, cookieOption, 
    emitEvent, deleteFilesFromCloudinary,
    uploadFilesToCloudinary
};