
import { useInfiniteScrollTop } from "6pp";
import { AttachFile as AttachFileIcon, Send as SendIcon } from "@mui/icons-material";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { InputBox } from "../components/styles/Styled";
import { gray } from "../constants/color";
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, STOP_TYPING } from "../constants/events";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useChatDetailsQuery, useGetMessageQuery } from "../redux/api/api";
import { setIsEmojiIcon, setIsFileMenu } from "../redux/reducers/misc";
import { getSocket } from "../socket";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { START_TYPING } from "../constants/events.js";
import { TypingLoader } from "../layout/Loaders.jsx";
import { useNavigate } from "react-router-dom";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Box } from "@mui/material";





const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  const emojiPickerRef = useRef(null);


  const socket = getSocket();
  const dispatch = useDispatch();



  const [message, setMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const typingTimeout = useRef(null);



  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);




  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  //agr chatId nahi hai to skip krdo query ko or hai to data lelenge isme se

  const oldMessagesChunk = useGetMessageQuery({ chatId, page });


  //har scroll pe page increment hoga or data milega next 20 messages ka next 20 to ese uske lie h 

  const { data: oldMessages, setData: setOldMessages } =
    useInfiniteScrollTop(
      containerRef,
      oldMessagesChunk.data?.totalPages,
      page,
      setPage,
      oldMessagesChunk.data?.message,


    );



  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error }

  ];

  const members = chatDetails?.data?.chat?.members;

  const messageOnChange = (e) => {
    setMessage(e.target.value);
    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);

    }
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [3000]);
  }

  const handleFileOpen = (e) => {
    setAnchorEl(e.currentTarget);
    dispatch(setIsFileMenu(true));

  };

  const handleEmojiOpen = () => {
    //  setAnchorEl(e.currentTarget);
   dispatch(setIsEmojiIcon(true));
    setShowEmojiPicker((prev) => !prev)
  }



  const SubmitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;


    socket.emit(NEW_MESSAGE, { chatId, members, message });
    //emitting message to server
    setMessage("");

  };


  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members })
    dispatch(removeNewMessagesAlert(chatId));
    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, { userId: user._id, members });

    }
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!chatDetails.data?.chat) return navigate("/");

  }, [chatDetails?.data])


  useEffect(() => {
    if (chatDetails.isError) {
      const status = chatDetails.error?.status;

      if (status === 403) {
        alert("You are not a member of this group");
        return navigate("/"); // only redirect for unauthorized
      }

      if (status === 404) {
        alert("This chat doesn't exist");
        return navigate("/");
      }
    }
  }, [chatDetails]);




  useEffect(() => {
    const handleClickOutSide = (event) => {
      if(
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    if(showEmojiPicker){
      document.addEventListener("mousedown", handleClickOutSide);
       }else {
        document.removeEventListener("mousedown", handleClickOutSide);
       }
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);

    }
  }, [showEmojiPicker]);







  const newMessagesListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setMessages((prev) => [...prev, data.message]);
  }, [chatId]);


  //yeh listning k liye bna rhe
  const startTypingListener = useCallback((data) => {
    if (data.chatId !== chatId) return;

    setUserTyping(true)



  }, [chatId]);


  const stopTypingListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setUserTyping(false);

  }, [chatId]);

  //used for user and admin only
  const alertListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    const messageForAlert = {
      content: data.message,
      // _id: uuid(),
      sender: {
        _id: "randomid",
        name: "admin",
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    setMessage((prev) => [...prev, messageForAlert]);
  }, [chatId]);

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,

  };
  useSocketEvents(socket, eventHandler);

  useErrors(errors);

  // const allMessages = [...oldMessages, ...messages];
  const allMessages = [...(oldMessages || []).reverse(), ...messages];



  // console.log("allMessages", allMessages);







  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={gray}
        height={"90%"}

        sx={{
          overflowX: "hidden",
          overflowY: "auto",


        }}>


        {
          allMessages.map((message) => (
            <MessageComponent
              key={message._id}
              message={message}
              user={user}

            />
          ))
        }

        {userTyping && <TypingLoader />}
        <div ref={bottomRef} />

      </Stack>

{/* 
      <form
        style={{
          height: "10.9%",
        }}
        onSubmit={SubmitHandler}
      >

        <Stack direction={"row"} height={"100%"} padding={"1rem"} alignItems={"center"}
          position={"relative"} spacing={2}


        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg"
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>

          
            <IconButton 
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}>
              😊
            </IconButton>

            {showEmojiPicker && (
              <Box position="absolute" bottom="60px" right="100px" zIndex={10}>
                <Picker
                  data={data}
                  onEmojiSelect={(emoji) => {
                    setMessage(prev => prev + emoji.native);
                  }}
                />
              </Box>
            )}


          <InputBox placeholder={"Type Message Here ...."}
            value={message}
            onChange={messageOnChange}
          />


          <IconButton type={"submit"}
            sx={{
              // rotate:"-15deg",
              backgroundColor: "rgb(244, 75, 123)",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "#FF8C00",
              }
            }}

          >

            <SendIcon />
          </IconButton>
        </Stack>
      </form> */}



      
    <div
     style={{
    height: "10.9%",
  }}
>
  <Stack
    direction={"row"}
    height={"100%"}
    padding={"1rem"}
    alignItems={"center"}
    position={"relative"}
    spacing={2}
    component="form"
    onSubmit={SubmitHandler}
  >
    
  <Stack direction="row" spacing={1} alignItems="center">
  <IconButton
    sx={{ rotate: "30deg" }}
    onClick={handleFileOpen}
    type="button"
  >
    <AttachFileIcon />
  </IconButton>

  <IconButton
    // onClick={() => setShowEmojiPicker((prev) => !prev)}
    onClick={handleEmojiOpen}
    type="button"
  >
    😊
  </IconButton>

  {showEmojiPicker && (
  <Box
    ref={emojiPickerRef}
    position="absolute"
    bottom="60px"
    right="320px"
    zIndex={10}
  >
    
    <Picker
      data={data}
      onEmojiSelect={(emoji) => {
        if (!emoji?.native) return;
        setMessage((prev) => prev + emoji.native);
      }}
    />
  </Box>
)}

</Stack>
    

  

    <InputBox
      placeholder={"Type Message Here ...."}
      value={message}
      onChange={messageOnChange}
    />

    <IconButton
      type="submit"
      sx={{
        backgroundColor: "rgb(244, 75, 123)",
        color: "white",
        marginLeft: "1rem",
        padding: "0.5rem",
        "&:hover": {
          bgcolor: "rgb(253, 156, 182)",
        },
      }}
    >
      <SendIcon />
    </IconButton>
  </Stack>











</div>


      <FileMenu anchorEl={anchorEl} chatId={chatId} />



    </Fragment>
  );


};

// export default Applayout(Chat);
export default Chat;





