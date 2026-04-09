import { compare } from "bcrypt";
import { NEW_REQUEST, REFETCH_CHATS, REFETCH_REQUESTS } from "../constants/events.js";
import { Member } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Request } from "../models/request.js";
import { User } from "../models/user.js";
import { emitEvent, sendToken, uploadFilesToCloudinary } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";




const newUser = TryCatch(async (req,res,next) => {
  const {namee, username, password, bio} = req.body;
  const file = req.file
 

  if(!file)
    return next(new ErrorHandler("Please upload avatar"));


  const result = await uploadFilesToCloudinary([file]);
  console.log("Cloudinary Upload Result:", result);
  

  
const avatar = {
  public_id: result[0].public_id,
  url: result[0].url,
};

const user = await User.create({
  namee,
  bio,
  username,
  password,
  avatar,
});
sendToken(res, user, 201, "User Created");
})



const login = TryCatch(async(req, res, next) => {

    const {username, password} = req.body;
    const user = await User.findOne({username}).select("+password");
     if(!user) return next (new ErrorHandler("invalid username or password", 404));
  
    const isPasswordMatch = await compare(password, user.password);
    if(!isPasswordMatch) return next (new ErrorHandler("invalid username or password", 404));
    sendToken(res, user, 200, `Welcome Back , ${user.namee}`);
   }
)

const getMyProfile = TryCatch( async(req,res) => {
 const user = await User.findById(req.user);
  res.status(200).json({
    success: true,
    user,
  
  })
})



const logout = TryCatch(async (req, res) => {
  res.clearCookie("chitchat-cookie", { path: "/", httpOnly: true, secure: true, sameSite: "None" });
  res.clearCookie("chitchat-token", { path: "/", httpOnly: true, secure: true, sameSite: "None" });

  return res.status(200).json({
    success: true,
    message: "Logged Out Successfully!",
  });
});


const SearchUser = TryCatch(async (req, res) => {
 const { namee = "" } = req.query;
 //only my chats
 const myChats = await Chat.find({ groupChat: false, members: req.user});
 //all users including me and the one i had chat with
 const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);

 const allUsersExceptMeAndFriends = await User.find({
  _id: {$nin: [...allUsersFromMyChats, req.user]}, //it will not include req.user ya loggedin user khudko ni include krega fried list me
  namee: {$regex:namee, $options: "i"},
 });


 const users = allUsersExceptMeAndFriends.map((user) => ({
  // _id,
  // namee,
  // avatar: avatar.url, 

  _id: user._id,
  namee: user.namee,
  avatar: user.avatar.url,
 }))

  return res.status(200).json({
    success: true,
   users,
  });
});




const sendFriendRequest = TryCatch(async (req,res, next) => {
  const { userId } = req.body;
  // if (req.user.toString() === userId.toString()) {
  //   return next(new ErrorHandler("You cannot send friend request to yourself", 400));
  // }
  
  const request = await Request.findOne({
    $or: [
      {sender: req.user, receiver: userId},
      {sender: userId, receiver: req.user},
    ],
  });
  if(request) return next(new ErrorHandler("Request already sent, 400"));
  await Request.create({
    sender: req.user,
    receiver: userId
  });
  emitEvent(req, NEW_REQUEST, [userId]);
  return res.status(200).json({
    success: true,
    message: "Friend request sent",
  })
})




const acceptFriendRequest = TryCatch(async(req,res,next)=> {
   const {requestId, accept} = req.body;

   
   const request = await Request.findById(requestId)
         .populate("sender", "namee")
         .populate("receiver", "namee");
         console.log(request);

   if(!request) 
    return next (new ErrorHandler("request not found ", 404));

  
 
// if(request.receiver._id.toString() !== req.user.toString()) {
//   return next(new ErrorHandler("You are not authorized to accept this request", 401));

// }

  
  if(!accept) {
    await request.deleteOne();
    return res.status(200).json({
      success:true,
      message: "Friend Request Rejected",
    });
  }
  const members = [request.sender._id, request.receiver._id];
  
  await Promise.all([
    Chat.create({
      members,
      namee: `${request.sender.namee}-${request.receiver.namee}`,
    }),
    User.findByIdAndUpdate(request.sender._id, { $addToSet: { friends: request.receiver._id } }),
  User.findByIdAndUpdate(request.receiver._id, { $addToSet: { friends: request.sender._id } }),
    request.deleteOne(),
  ]);
 
 

  emitEvent(req, REFETCH_CHATS, members);


  return res.status(200).json({
    success:true,
    message: "Friend Request Accepted",
    senderId: request.sender._id,
  });

});


const addFriend = async (req, res) => {
  const { friendId } = req.body;
  const user = await User.findById(req.user._id);
  const friend = await User.findById(friendId);

  if (!user.friends.includes(friendId)) user.friends.push(friendId);
  if (!friend.friends.includes(req.user._id)) friend.friends.push(req.user._id);

  await user.save();
  await friend.save();

  res.status(200).json({ message: "Friend added successfully" });
};


// const getMyFriends = TryCatch(async (req, res) => {
//   const chatId = req.query.chatId;
  
  
//   const chats = await Chat.find({
//     members: req.user,
//     groupChat: false,
  
//   }).populate("members", "namee avatar");
  
//   const friends = chats.map(({members}) => {
//     const otherUser = Member(members, req.user)
  
//     return{
//       _id: otherUser._id,
//       namee: otherUser.namee,
//       avatar: otherUser?.avatar?.url,
//     };
//   });
//   if(chatId){
//     const chat = await Chat.findById(chatId)
//     const availableFriends = friends.filter(
//       (friend) => !chat.members.includes(friend._id)
//     );
//     return res.status(200).json({
//       success: true,
//       friends: availableFriends,
//     });
//   } else {
//     return res.status(200).json({
//       success: true,
//       friends,
//     });
//   }
  
  
   
  
   
//   });




const getMyFriends = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id).populate("friends", "namee avatar");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const friends = user.friends.map(friend => ({
    _id: friend._id,
    namee: friend.namee,
    avatar: friend.avatar?.url || "",
  }));

  return res.status(200).json({
    success: true,
    friends,
  });
});








  
// const getMyFriends = TryCatch(async (req, res) => {
//   const user = await User.findById(req.user._id).populate("friends", "namee avatar");

//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User not found",
//     });
//   }

//   const friends = user.friends.map(friend => ({
//     _id: friend._id,
//     namee: friend.namee,
//     avatar: friend.avatar?.url || "", // Avoid breaking if avatar is missing
//   }));

//   return res.status(200).json({
//     success: true,
//     friends,
//   });
// });





const notifications = TryCatch(async(req,res,next) => {
const requests = await Request.find({receiver: req.user}).populate(
  "sender",
  "namee avatar"
);



const allRequests = requests
  .filter((req) => req.sender && req.sender._id)
  .map(({ _id, sender }) => ({
    _id,
    sender: {
      _id: sender._id,
      namee: sender.namee,
      avatar: sender.avatar?.url || "",
    },
  }));


res.status(200).json({
  success: true,
  allRequests,
});


});











export { acceptFriendRequest, getMyFriends, getMyProfile, login, logout, newUser, notifications, SearchUser, sendFriendRequest,
         addFriend
 };

