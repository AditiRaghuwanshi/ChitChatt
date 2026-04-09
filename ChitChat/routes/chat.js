


import express from "express";
import { isAuthenticated } from "../middlewares/isAuth.js";
import { AddMembers, deleteChat, getChatDetails, getMessage, getMyGroups, 
    leaveGroup, 
    MyChats, newGroupChat, removeMembers, renameeGroup, sendAttachment} from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import { addmembersValidator, newGroupChatValidator, removemembersValidator, validate,  sendattachmentValidator,  chatIdValidator, renameeGroupValidator  } from "../lib/validator.js";



const router = express.Router();




router.use(isAuthenticated);
router.post("/new", newGroupChatValidator(), validate, newGroupChat)
router.get("/my", MyChats)
router.get("/my/groups", getMyGroups)
router.put("/addmembers", addmembersValidator(), validate, AddMembers)
router.put("/removemembers",removemembersValidator(), validate, removeMembers)
router.post("/attachments",attachmentsMulter,sendattachmentValidator(), validate, sendAttachment)
router.get("/message/:id",chatIdValidator(), validate, getMessage);
router.route("/:id")
.get(chatIdValidator(), validate, getChatDetails)
.put(renameeGroupValidator(),validate, renameeGroup)
.delete(chatIdValidator(), validate, deleteChat);
router.delete("/leave/:id", chatIdValidator(), validate, leaveGroup)





export default router;
