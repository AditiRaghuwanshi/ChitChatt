import { userSocketIDs } from "../app.js";

export const Member = (members, userId) => 
     members.find((member) => member._id.toString() !== userId.toString());

// export const getSockets = (users = []) => 
//   users.map((user) => userSocketIDs.get(user._id.toString()));

export const getSockets = (users = []) => {
  const sockets = users.map((user) => 
    userSocketIDs.get(user.toString()));
  return sockets;
}

// export const getBase64 = (file) => 
//      `data: ${file.mimetype};base64,${file.buffer.toString("base64")}`;
     

   
   export const getBase64 = (file) => {
     return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
   };
   