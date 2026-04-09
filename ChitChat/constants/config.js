// const corsOptions = {
   
//        origin: [
//         // "https://chit-chat-frontend-sooty.vercel.app",
//            "http://localhost:5173",
//            // "http://localhost:4173",
//         //    process.env.CLIENT_URL,
//        ],
//        credentials: true,
//         allowedHeaders: ["Content-Type", "Authorization"],
   
// };

// const CHITCHAT_TOKEN = "chitchat-token";


// export { corsOptions, CHITCHAT_TOKEN };

// export const corsOptions = {
//   origin: [
//       pro
//     //  "http://localhost:5173",  
//   // "http://localhost:5173",
    
//   //  "https://chit-chat-frontend-sooty.vercel.app",
//   ],
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// };


// export const corsOptions = {
//   origin: process.env.CLIENT_URL,  // ← read from env
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// };

// export const CHITCHAT_TOKEN = "chitchat-token";


console.log("CLIENT_URL:", process.env.CLIENT_URL); // add temporarily
export const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

export const CHITCHAT_TOKEN = "chitchat-token";
