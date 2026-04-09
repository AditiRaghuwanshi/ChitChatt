


import express from "express";
import { isAuthenticated } from "../middlewares/isAuth.js";
import { login, newUser, getMyProfile, logout, SearchUser, sendFriendRequest, acceptFriendRequest, notifications, getMyFriends, addFriend } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { acceptRequestValidator, loginValidator, registerValidator,  sendRequestValidator,  validate } from "../lib/validator.js";




const router = express.Router();

router.post("/new", singleAvatar, registerValidator(), validate, newUser);  

router.post("/login", loginValidator(), validate , login);

router.put(
    "/sendRequest",
    isAuthenticated,            // ✅ this is mandatory!
    sendRequestValidator(),
    validate,
    sendFriendRequest
  );
router.put(
        "/acceptRequest",
        isAuthenticated,
        acceptRequestValidator(),
         validate, 
         acceptFriendRequest
        );
        
router.get("/notification", isAuthenticated, notifications);
router.post("/add-friend", isAuthenticated, addFriend);
router.get("/friends", isAuthenticated, getMyFriends);

    



//after here the user must be logged in this are the interal routes

router.use(isAuthenticated);
router.get("/me", getMyProfile);
router.get("/logout", logout);
router.get("/search", SearchUser);




export default router;
