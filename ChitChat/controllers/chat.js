import { ALERT, NEW_MESSAGE, NEW_MESSAGE_ALERT, REFETCH_CHATS } from "../constants/events.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import { deleteFilesFromCloudinary, emitEvent, uploadFilesToCloudinary } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";


const newGroupChat = TryCatch(async (req,res,next) => {
const {namee, members} = req.body;
    if(members.length < 2) 
        return next(
    new ErrorHandler("Group chat must have more than two members", 400));
    // const allMembers = [...members, req.user];
    const allMembers = Array.from(
        new Set([...members.map(m => m.toString()), req.user._id.toString()])
      );

    await Chat.create({
        namee, 
        groupChat: true,
        creator: req.user,
        members: allMembers,
    });
    emitEvent(req, ALERT, allMembers, `Welcome to ${namee} group`);
    emitEvent(req, REFETCH_CHATS, members);


    return res.status(201).json({
        success: true,
        message: "Group created",
    });
});


// const MyChats = async (req, res) => {
//     try {
//       const userId = req.user._id;
  
//       const chats = await Chat.find({ members: userId })
//         .populate("members", "namee avatar");
  
//       const transformedChats = chats.map(chat => {
//         if (!chat.groupChat) {
//           const otherMember = chat.members.find(
//             m => m._id.toString() !== userId.toString()
//           );
  
//           return {
//             _id: chat._id,
//             groupChat: false,
//             namee: otherMember?.namee || "Unknown",
//             avatar: [otherMember?.avatar?.url || ""],
//             members: chat.members.map(m => m._id),
//           };
//         } else {
//           return {
//             _id: chat._id,
//             groupChat: true,
//             namee: chat.namee,
//             avatar: chat.members.map(m => m.avatar?.url || ""), // ⭐ all avatars
//             members: chat.members.map(m => m._id),
//           };
//         }
//       });
  
//       res.status(200).json({
//         success: true,
//         chats: transformedChats,
//       });
//     } catch (error) {
//       console.error("Error fetching chats:", error);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   };
  
const MyChats = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const chats = await Chat.find({ members: userId })
        .populate("members", "namee avatar");
  
      const transformedChats = chats.map(chat => {
        if (!chat.groupChat) {
          const otherMember = chat.members.find(
            m => m._id.toString() !== userId.toString()
          );
  
          return {
            _id: chat._id,
            groupChat: false,
            namee: otherMember?.namee || "Unknown",
            avatar: [otherMember?.avatar?.url || ""],
            members: chat.members.map(m => m._id),
          };
        } else {
          return {
            _id: chat._id,
            groupChat: true,
            namee: chat.namee,
            avatar: chat.members.map(m => m.avatar?.url || ""), // ⭐ all avatars
            members: chat.members.map(m => m._id),
          };
        }
      });
  
      res.status(200).json({
        success: true,
        chats: transformedChats,
      });
    } catch (error) {
      console.error("Error fetching chats:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  


    




  
  
const getMyGroups = TryCatch(async(req,res,next) => {

    
    const chats = await Chat.find({
        members: req.user,
        creator: req.user,
        groupChat: true,
    }).populate("members", "namee avatar");

    const groups = chats.map(({members, _id, groupChat, namee}) => ({
    _id,
    groupChat,
    namee,
    avatar: members.slice(0,3).map(({avatar}) => avatar.url),
    }));

    return res.status(200).json({
        success: true,
        groups,
    });

});


const AddMembers = TryCatch(async (req, res, next) => {
    try {
        const { chatId, members } = req.body;
 
        if (!members || members.length < 1) {
            return next(new ErrorHandler("Provide members to the group", 400));
        }
 
        const chat = await Chat.findById(chatId);
 
        if (!chat) return next(new ErrorHandler("Chat not found!", 404));
        if (!chat.groupChat) return next(new ErrorHandler("Group chat not found", 400));
        
 
        if (chat?.creator?.toString() === req?.user?.toString()) {
            return next(new ErrorHandler("Members added", 500));
        }
 
        console.log("creator", chat?.creator?.toString());
        console.log("user", req?.user?.toString());
        // Fetch new members
        const AllNewMembersPromise = members.map((i) => User.findById(i, "namee"));
        const allNewMembers = await Promise.all(AllNewMembersPromise);
 
        const uniqueMembers = allNewMembers
        .filter((i) => !chat.members.includes(i._id.toString()))
        .map((i) => i._id);

        // Add new members
        // chat.members.push(...allNewMembers.map((i) => i._id));
        chat.members.push(...uniqueMembers);
        if (chat.members.length > 100) {
            return next(new ErrorHandler("Group limit exceeded, you cannot add more than 100 members", 400));
        }
 
        await chat.save();
 
        const allUsername = allNewMembers.map((i) => i.namee).join(",");
 
        emitEvent(req, ALERT, chat.members, `${allUsername} has been added to the group`);
        emitEvent(req, REFETCH_CHATS, chat.members);
 
        return res.status(200).json({
            success: true,
            message: "Members have been added to the group",
        });
 
    } catch (error) {
        console.error("Error in AddMembers:", error);
        return next(new ErrorHandler("Internal Server Error", 500));
    }
 });



  

 const removeMembers = TryCatch(async (req,res,next) => {
    const {userId, chatId} = req.body;
    const [chat, userThatWillBeRemoved] = await Promise.all([
        Chat.findById(chatId),
        User.findById(userId),
    ]);

      if (!chat) return next(new ErrorHandler("Chat not found!", 404));
        if (!chat.groupChat) return next(new ErrorHandler("Group chat not found", 400));
        if (!userThatWillBeRemoved) return next(new ErrorHandler("User not found!", 404));
 
        // if (chat.creator.toString() !== req.user.toString()) {
        //     return next(new ErrorHandler("You are not allowed to remove Members", 403));
        // }
        
        if(chat.members.length <=3)
            return next(new ErrorHandler("group should have atleast 3 members", 400))
        
        const allChatMembers = chat.members.map((i) => i.toString());
        
        chat.members = chat.members.filter(
            (member) => member.toString() !== userId.toString()
        );
        
   await chat.save();
        emitEvent(
            req,
            ALERT,
            chat.members,
            {
                message: `${userThatWillBeRemoved.namee} has been removed from the group`,
                chatId
            }
        );

        emitEvent(req, REFETCH_CHATS, allChatMembers);

        return res.status(200).json({
            success:true,
            message: "Members removed successfully",
        });

  
 });

const sendAttachment = TryCatch(async(req,res,next) => {
    const { chatId} = req.body;
    const files = req.files || [];
    console.log(files);
     if(files.length < 1)
        return next(new ErrorHandler("Please Upload Attachment", 400));
    if(files.length > 5)
        return next(new ErrorHandler("Files Cannot be more than 5"));
 
 const [chat, me] = await Promise.all([
        Chat.findById(chatId),
        User.findById(req.user,"namee"),
    ]);

    if(!chat) return next (new ErrorHandler ("Chat does not exists", 404));

    const attachments = await uploadFilesToCloudinary(files);



    const messageForDB = 
        {
        content: "",
         attachments, 
         sender: me._id, 
         chat: chatId,
        };


    
    const messageForRealTime = {
      ...messageForDB,
      sender: {
        _id: me._id,
        namee: me.namee,
           },
    };

    const message = await Message.create(messageForDB);
    emitEvent(
        req,
        NEW_MESSAGE,
        chat.members,
        {
            message: messageForRealTime,
            chatId,

        });

        emitEvent(
            req,
            NEW_MESSAGE_ALERT,
            chat.members,
            {chatId });

    

    return res.status(200).json({
            success:true,
            message,
        });


});


const getChatDetails = TryCatch(async(req,res,next) => {
    let chat;
if(req.query.populate === "true") {
    chat = await Chat.findById(req.params.id)
    .populate(
        "members",
        "namee avatar"
    ).lean()

if(!chat) return next(new ErrorHandler("chat does not exist", 404));

chat.members = chat.members.map(({_id, avatar, namee }) => 
    ({
        _id,
        namee,
        avatar: avatar?.url || null,
        
    }));

    return res.status(200).json({
        success:true,
        chat,
    });

} else {
    chat = await Chat.findById(req.params.id);
if (!chat) return next(new ErrorHandler("chat does not exist", 404));

return res.status(200).json({success:true,chat
});
}
});


const renameeGroup = TryCatch(async (req, res, next) => {
    const chatId = req.params.id; 
    const { namee } = req.body;

    

    const chat = await Chat.findById(chatId);
    
    if (!chat) return next(new ErrorHandler("Chat does not exist", 404));

    if (!chat.groupChat)  
        return next(new ErrorHandler("chatId should be from a valid Group", 400));



    // if (chat.creator.toString() !== req.user.toString())  
    //     return next(new ErrorHandler("Only the creator can renamee the group", 400));

    chat.namee = namee;
    await chat.save();
    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
        success: true,
        message: "Group namee updated",
      
    });
});


const deleteChat = TryCatch(async (req,res,next) => {
    const chatId = req.params.id;
    console.log(chatId);

    const chat = await Chat.findById(chatId);
    
    if (!chat) return next(new ErrorHandler("Chat does not exist", 404));

   const members = chat.members;
   if(chat.groupChat && chat.creator.toString() === req.user.toString())
    return next (new ErrorHandler("Group chat deleted successfully!", 403));
  
   console.log(members, "grp")

//    if(!chat.groupChat && !chat.members.includes(req.user.toString())){
//     return next(new ErrorHandler("Invalid Request , you are not the member of grp anymore:) sweetheart", 403))
//    }

   //here we have to del all messages and attachments from cloudinary
   const messagesWithAttachments = await Message.find({chat:chatId,
    attachments: {$exists:true, $ne: []}, });
    const public_ids = [];

    messagesWithAttachments.forEach(({attachments}) => 
           attachments.forEach(({ public_id }) => 
            public_ids.push(public_id)));
    await Promise.all([
        deleteFilesFromCloudinary(public_ids),
        chat.deleteOne(),
        Message.deleteMany({chat: chatId}),
    ]);

    emitEvent(req, REFETCH_CHATS, members);

    return res.status(200).json({
        success: true,
        message: "chat deleted successfully",
    });
});


const leaveGroup = TryCatch(async (req, res, next) => {
  const { id: chatId } = req.params;

  const chat = await Chat.findById(chatId);
  if (!chat) return next(new ErrorHandler("Group not found", 404));
  if (!chat.groupChat) return next(new ErrorHandler("Not a group chat", 400));

  const userId = req.user._id.toString();

  // Remove the user from members
  chat.members = chat.members.filter(
    (member) => member.toString() !== userId
  );

  let newAdminAssigned = false;
  let newAdminId = null;

  // If user is admin and others are still present, reassign admin
  if (chat.creator.toString() === userId && chat.members.length > 0) {
    const newAdmin = chat.members[Math.floor(Math.random() * chat.members.length)];
    chat.creator = newAdmin;
    newAdminAssigned = true;
    newAdminId = newAdmin;
  }

  // If no members left, delete the group
  if (chat.members.length < 2) {
    await chat.deleteOne();
    return res.status(200).json({ success: true, message: "Left and group deleted" });
  }

  await chat.save();

  emitEvent(req, "ALERT", chat.members, `${req.user.namee} left the group`);
  emitEvent(req, "REFETCH_CHATS", chat.members);

  // ✅ Notify new admin
  if (newAdminAssigned && newAdminId) {
    emitEvent(req, "ALERT", [newAdminId], "You are now the admin of the group");
  }

  return res.status(200).json({ success: true, message: "Left group" });
});




// const leaveGroup = TryCatch(async (req, res, next) => {
//   const { id: chatId } = req.params;

//   const chat = await Chat.findById(chatId);
//   if (!chat) return next(new ErrorHandler("Group not found", 404));
//   if (!chat.groupChat) return next(new ErrorHandler("Not a group chat", 400));

//   const userId = req.user._id.toString();

//   // Remove user from group
//   chat.members = chat.members.filter(
//     (member) => member.toString() !== userId
//   );

//   // Optional: Delete chat if no members left or only creator left
//   if (chat.members.length < 1) {
//     await chat.deleteOne();
//     return res.status(200).json({ success: true, message: "Left and group deleted" });
//   }

//   await chat.save();

//   emitEvent(req, "ALERT", chat.members, `${req.user.namee} left the group`);
//   emitEvent(req, "REFETCH_CHATS", chat.members);

//   return res.status(200).json({ success: true, message: "Left group" });
// });




// const leaveGroup = TryCatch(async (req, res, next) => {
//   const { id: chatId } = req.params;

//   const chat = await Chat.findById(chatId);
//   if (!chat) return next(new ErrorHandler("Group not found", 404));
//   if (!chat.groupChat) return next(new ErrorHandler("Not a group chat", 400));

//   const userId = req.user._id.toString();

//   // Remove the user from members
//   chat.members = chat.members.filter(
//     (member) => member.toString() !== userId
//   );

//   // If user is admin and others are still present, reassign admin
//   if (chat.creator.toString() === userId && chat.members.length > 0) {
//     const newAdmin = chat.members[Math.floor(Math.random() * chat.members.length)];
//     chat.creator = newAdmin; // reassign new admin
//   }

//   // If no members left, delete the group
//   if (chat.members.length < 2) {
//     await chat.deleteOne();
//     return res.status(200).json({ success: true, message: "Left and group deleted" });
//   }

//   await chat.save();

//   emitEvent(req, "ALERT", chat.members, `${req.user.namee} left the group`);
//   emitEvent(req, "REFETCH_CHATS", chat.members);

//   return res.status(200).json({ success: true, message: "Left group" });
// });




const getMessage = TryCatch(async(req,res,next) => {
 const chatId = req.params.id;
 const {page = 1} = req.query;
 const resultPerPage = 20; //message per page 20;
 const skip = (page - 1) * resultPerPage; 

 const chat = await Chat.findById(chatId);
    if(!chat) return next(new ErrorHandler("Chat does not exist", 404));
    // if(!chat.members.includes(req.user.toString())) 
    //     return next(
    //         new ErrorHandler("You are not a member of this group", 403)
    
    //     );

 const [messages,totalMessageCount] = await Promise.all([
    Message.find({chat: chatId})
    .sort({created: -1})
    .skip(skip)
    .limit(resultPerPage)
    .populate("sender", "namee")
    .lean(),
    Message.countDocuments({chat: chatId}),
 ]);
 console.log(totalMessageCount)
 const totalPages = Math.ceil(totalMessageCount/resultPerPage)

 return res.status(200).json({
    success:true,
    message: messages.reverse(),
    totalPages,
 })





})










 

export { AddMembers, deleteChat, getChatDetails, getMessage, getMyGroups, leaveGroup, MyChats, newGroupChat, removeMembers, renameeGroup, sendAttachment };
