






// import express from "express";
// import { connectDB } from "./utils/features.js";
// import { errorMiddleware } from "./middlewares/error.js";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import adminRoute from "./routes/admin.js";
// import userRoute from "./routes/user.js";
// import chatRoute from "./routes/chat.js";
// import { createGroupChat,  createSingleChat } from "./seeders/chat.js";
// import { Server } from "socket.io";
// import {createServer} from "http";
// import { v4 as uuid } from "uuid";
// import { CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, NEW_MESSAGE_ALERT, ONLINE_USERS, START_TYPING, STOP_TYPING } from "./constants/events.js";
// import { getSockets } from "./lib/helper.js";
// import { Message } from "./models/message.js";
// import cors from 'cors'
// import { v2 as cloudinary} from "cloudinary";
// import { corsOptions } from "./constants/config.js";
// import { socketAuthenticator } from "./middlewares/isAuth.js";



// dotenv.config({
//     path: "./.env",
// })

// const mongoURI = process.env.MONGO_URI;
// const port = process.env.PORT || 3000;
//  const adminSecretKey = process.env.ADMIN_SECRET_KEY || "Aditiii"; 
//  const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
//  const userSocketIDs= new Map();
//  const onlineUsers = new Set();

// connectDB(mongoURI);


// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_name,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// })


// const app = express();
// const server = createServer(app);
// const io = new Server(server, {
//     cors: corsOptions,
// });

// app.set("io", io);

// // Middleware to parse JSON (important if using POST requests later)
// app.use(express.json()); //jsondata
// // app.use(express.urlencoded()); //formdata

// app.use(cookieParser());
// app.use(cors(corsOptions));

// app.use("/api/v1/admin", adminRoute);
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/chat", chatRoute);

// app.get("/", (req,res) => {
//     res.send("welcome home");
// });




// //cookie parseer ka use kra for authentication
// io.use((socket, next)=> {
//     cookieParser()(
//         socket.request, 
//         socket.request.res,
//          async (err) => await socketAuthenticator(err, socket, next)
//     );
// });

// io.on("connection", (socket) => {
//     const user = socket.user;
   
//     userSocketIDs.set(user._id.toString(), socket.id);

    
//     socket.on(NEW_MESSAGE, async({chatId, members, message}) => {
       

        
//         const memberSocket = getSockets(members);

      
//       const messageForRealTime = {
//         content:message,
//        _id: uuid(),
//         sender: {
//             _id: user._id,
//             namee: user.namee,
//         },
//           chat: chatId,
//           createdAt: new Date().toISOString(),
//       };

//       const messageForDB = {
//         content: message,
//         sender: user._id,
//         chat: chatId,
//       };

  

     
//       io.to(memberSocket).emit(NEW_MESSAGE, {
//         chatId,
//         message: messageForRealTime,
//       });
//       io.to(memberSocket).emit(NEW_MESSAGE_ALERT, {chatId});
    
//       try{
//         await Message.create(messageForDB);
//     }catch(error){
//         console.log(error);
//     }


//     });

//     socket.on(START_TYPING, ({members, chatId}) => {
       
//        //emitting the socket
//        const membersSocket = getSockets(members);
//        socket.to(membersSocket).emit(START_TYPING, {chatId});

//     });


//     socket.on(STOP_TYPING, ({members, chatId}) => {
    
//         //emitting the socket
//         const membersSocket = getSockets(members);
//         socket.to(membersSocket).emit(STOP_TYPING, {chatId});
 
//      });

//     //  socket.on(CHAT_JOINED, (userId, members)=>{
//     //     console.log("chat joined", userId);
//     //     onlineUsers.add(userId.toString());
//     //     const membersSocket = getSockets(members);
//     //     io.to(membersSocket).emit(ONLINE_USERS, Array.from(onlineUsers));
//     //  });

//     socket.on(CHAT_JOINED, ({ userId, members }) => {
//         console.log("chat joined raw userId:", userId);
//         console.log("typeof userId:", typeof userId);
//         console.log("chat members:", members);
    
//         if (!userId) return;
    
//         onlineUsers.add(userId.toString());
    
//         const membersSocket = getSockets(members);
//         console.log("Sending online users:", Array.from(onlineUsers));
//         io.to(membersSocket).emit(ONLINE_USERS, Array.from(onlineUsers));
//     });
    
    

//     //  socket.on(CHAT_LEAVED, (userId, members)=>{
//     //     console.log("chat leave", userId);
//     //     onlineUsers.delete(userId.toString());
//     //     const membersSocket = getSockets(members);
//     //     io.to(membersSocket).emit(ONLINE_USERS, Array.from(onlineUsers));
//     //  });

//      socket.on(CHAT_LEAVED, ({ userId, members }) => {
//         if (!userId) return;
    
//         onlineUsers.delete(userId.toString());
    
//         const membersSocket = getSockets(members);
//         io.to(membersSocket).emit(ONLINE_USERS, Array.from(onlineUsers));
//     });
    


   

//     socket.on("disconnect", () => {
      
//         userSocketIDs.delete(user._id.toString());
//     });
// });

// app.use(errorMiddleware);

// server.listen(port, () => {
//     console.log(`Server is running on port ${port} in ${process.env.NODE_ENV} Mode`);
// });

// export {envMode, adminSecretKey, userSocketIDs};








import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuid } from "uuid";
import "./env.js"
import { corsOptions } from "./constants/config.js";
import {
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  ONLINE_USERS,
  START_TYPING,
  STOP_TYPING,
} from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { errorMiddleware } from "./middlewares/error.js";
import { socketAuthenticator } from "./middlewares/isAuth.js";
import { Message } from "./models/message.js";
import adminRoute from "./routes/admin.js";
import chatRoute from "./routes/chat.js";
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";

dotenv.config({ path: "./.env" });

const app = express(); // ✅ Initialize app early

// ✅ Apply CORS and request logging before routes
app.use((req, res, next) => {
  console.log("CORS origin received:", req.headers.origin);
  next();
});
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));




// ✅ Core middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/chat", chatRoute);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Welcome home");
});

// ✅ Connect to DB
connectDB(process.env.MONGO_URI);

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Server and Socket.IO setup
const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

app.set("io", io);

// ✅ Socket authentication middleware
io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res || {}, async (err) =>
    socketAuthenticator(err, socket, next)
  );
});

// ✅ In-memory structures
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "Aditiii";
const envMode = process.env.NODE_ENV?.trim() || "PRODUCTION";
const port = process.env.PORT || 3000;
const userSocketIDs = new Map();
const onlineUsers = new Set();

// ✅ Socket connection handling
io.on("connection", (socket) => {
  const user = socket.user;
  userSocketIDs.set(user._id.toString(), socket.id);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const memberSocket = getSockets(members);
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: { _id: user._id, namee: user.namee },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };
    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };
    io.to(memberSocket).emit(NEW_MESSAGE, { chatId, message: messageForRealTime });
    io.to(memberSocket).emit(NEW_MESSAGE_ALERT, { chatId });
    try {
      await Message.create(messageForDB);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on(START_TYPING, ({ members, chatId }) => {
    socket.to(getSockets(members)).emit(START_TYPING, { chatId });
  });

  socket.on(STOP_TYPING, ({ members, chatId }) => {
    socket.to(getSockets(members)).emit(STOP_TYPING, { chatId });
  });

  socket.on(CHAT_JOINED, ({ userId, members }) => {
    if (!userId) return;
    onlineUsers.add(userId.toString());
    io.to(getSockets(members)).emit(ONLINE_USERS, Array.from(onlineUsers));
  });

  socket.on(CHAT_LEAVED, ({ userId, members }) => {
    if (!userId) return;
    onlineUsers.delete(userId.toString());
    io.to(getSockets(members)).emit(ONLINE_USERS, Array.from(onlineUsers));
  });

  socket.on("disconnect", () => {
    userSocketIDs.delete(user._id.toString());
  });
});

// ✅ Error middleware
app.use(errorMiddleware);

// ✅ Server start
server.listen(port, () => {
  console.log(`Server running on port ${port} in ${envMode} mode`);
});


// server.listen(port, () => {
//   console.log(`Server running on port ${port} `);
// });




export { adminSecretKey, envMode, userSocketIDs };



