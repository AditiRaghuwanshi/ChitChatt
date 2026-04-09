import { body, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";



const validate = (req, res, next) => {
    const errors = validationResult(req);
    const errorMessage = errors.array().map((error) => error.msg).join(",");
    if (errors.isEmpty()) {
        return next();
    }else {
        next(new ErrorHandler(errorMessage, 400))
    }
    next();
};




const registerValidator = () => [
    body("namee").notEmpty().withMessage("Please Enter namee"),
    body("username").notEmpty().withMessage("Please Enter username"),
    body("bio").notEmpty().withMessage("Please Enter bio"),
    body("password").notEmpty().withMessage("Please Enter password"),

   
];


const loginValidator = () => [
    body("username").notEmpty().withMessage("Please Enter username"),

    body("password").notEmpty().withMessage("Please Enter password"),
];


const sendRequestValidator = () => [
    body("userId").notEmpty().withMessage("Please ensure you entered UserId"),
];

const acceptRequestValidator = () => [
    body("requestId").notEmpty().withMessage("Please ensure you entered UserId"),
    body("accept").notEmpty().withMessage("accept the request"),
];

const adminLoginValidator = () => [
    body("secretKey", "Please Enter Secret Key").notEmpty(),
    
]







 


const newGroupChatValidator = () => [
    body("namee").notEmpty().withMessage("Groupnamee is necessary!"),

    body("members")
    .notEmpty().withMessage("Members are necessary")
    .isArray({min:2, max: 100})
    .withMessage("Members must be more than 2 for groups"),
];


const addmembersValidator = () => [
    body("chatId")
        .notEmpty()
        .withMessage("ChatId is required to add Members"),
    
    // body("members")
    //     .notEmpty()
    //     .withMessage("Members are necessary")
    //     .isArray({ min: 3, max: 100 })
    //     .withMessage("Members must be more than 2 for groups and should not exceed more than 100"),
];



const removemembersValidator = () => [
    body("userId")
        .notEmpty()
        .withMessage("userId is required"),
    
    body("chatId")
        .notEmpty()
        .withMessage("chatId is required"),
];



const sendattachmentValidator = () => [
   body("chatId")
        .notEmpty()
        .withMessage("chatId is required"),
];


const chatIdValidator = () => [
   param("id")
   .notEmpty()
   .withMessage("id is required"),
 ];


 const renameeGroupValidator = () => [
    param("id")
    .notEmpty()
    .withMessage("id is required"),

    body("namee")
    .notEmpty()
    .withMessage("namee is required")
   
  ];
 
 







export { acceptRequestValidator, addmembersValidator, adminLoginValidator, chatIdValidator, loginValidator, newGroupChatValidator, registerValidator, removemembersValidator, renameeGroupValidator, sendattachmentValidator, sendRequestValidator, validate };









// import {validationResult, body} from "express-validator"



// const registerValidator = () => [

//     body(["namee", "Please Enter namee"]).notEmpty(),
//     body(["username", "Please Enter username"]).notEmpty(),
//     body(["bio", "Please Enter bio"]).notEmpty(),
//     body(["password", "Please Enter password"]).notEmpty(),
// ];

// const validate = (req,res,next) => {
//     const error = validationResult(req);
//     console.log(error);
//     if (error.isEmpty()) return next();
// }


// export { registerValidator, validate }