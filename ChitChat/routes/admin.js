import express from "express";
import { adminLogin, adminLogout, allChats, allMessages, allUsers, getDashboardStats, getAdminData } from "../controllers/admin.js";
import { adminLoginValidator, validate } from "../lib/validator.js";
import { AdminOnly } from "../middlewares/isAuth.js";




const router = express.Router();


router.post("/verify", adminLoginValidator(),validate, adminLogin)
router.get("/logout", adminLogout);

//only admin can access these routes

router.use(AdminOnly)

router.get("/", getAdminData);

router.get("/users", allUsers);
router.get("/chats", allChats);
router.get("/messages", allMessages);

router.get("/stats", getDashboardStats);





export default router;
