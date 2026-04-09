








// import { Stack } from "@mui/material";
// import { useState } from "react";
// import { gradiant } from "../../constants/color";
// import ChatItem from "../shared/ChatItem";

// const ChatList = ({
//     w = "100%",
//     chats = [],
//     onlineUsers = [],
//     newMessagesAlert = [{ chatId: "", count: 0 }],
//     handleDeleteChat,
// }) => {
//     const [selectedChatId, setSelectedChatId] = useState(null); // ✅ Track selected chat

//     return (

//         <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}
//             sx={{
//                 backgroundImage: gradiant
//             }}
//         >
//             {chats?.map((data, index) => {
//                 const { avatar, _id, namee, groupChat, members } = data;
//                 const newMessageAlert = newMessagesAlert.find(({ chatId }) => chatId === _id);
//                 const isOnline = members?.some((member) => 
//                 onlineUsers.includes(member._id)
            

//             );
//             console.log("Online Users:", onlineUsers); // ✅ will now show string IDs like '681d29...'

//             console.log("Chat Members:", members);


//                 return (
//                     <ChatItem
//                         key={_id}
//                         index={index}
//                         newMessageAlert={newMessageAlert}
//                         isOnline={isOnline}
//                         avatar={avatar}
//                         namee={namee}
//                         _id={_id}
//                         groupChat={groupChat}
//                         sameSender={selectedChatId === _id} 
//                         // sameSender={chatId === _id} 
//                         handleDeleteChat={handleDeleteChat}
//                         setSelectedChatId={setSelectedChatId} // ✅ Pass function to update selected chat
//                     />




                  

//                 );
//             })}
//         </Stack>
//     );
// };

// export default ChatList;








import { Stack, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { gradiant } from "../../constants/color";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  onlineUsers = [],
  newMessagesAlert = [{ chatId: "", count: 0 }],
  handleDeleteChat,
  onProfileClick,
  isMobile
}) => {
  const [selectedChatId, setSelectedChatId] = useState(null);

  return (
    <Stack width={w} direction="column" overflow="auto" height="100%" sx={{ backgroundImage: gradiant }}>
      {isMobile && (
        <Stack direction="row" justifyContent="flex-end" padding="0.5rem">
          <IconButton onClick={onProfileClick} sx={{ color: gradiant }} aria-label="profile" 
        
          >
            <AccountCircleIcon />
          </IconButton>
        </Stack>
      )}

      {chats.map((data, index) => {
        const { avatar, _id, namee, groupChat, members } = data;
        const newMessageAlert = newMessagesAlert.find(({ chatId }) => chatId === _id);
        const isOnline = members?.some((member) => onlineUsers.includes(member._id));

        return (
          <ChatItem
            key={_id}
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            namee={namee}
            _id={_id}
            groupChat={groupChat}
            sameSender={selectedChatId === _id}
            handleDeleteChat={handleDeleteChat}
            setSelectedChatId={setSelectedChatId}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
