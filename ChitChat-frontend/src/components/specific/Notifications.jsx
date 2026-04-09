import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from "@mui/material";

import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { useAcceptFriendRequestMutation, useGetNotificationQuery } from "../../redux/api/api";
import { setIsNotification } from "../../redux/reducers/misc";

const Notifications = () => {

  const user = useSelector((state) => state.auth.user);


  const { isNotification } = useSelector((state) => state.misc);
  const { isLoading, data, error, isError } = useGetNotificationQuery();

  const dispatch = useDispatch();

  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));

    await acceptRequest("accepting friend request", {requestId: _id, accept});

  };    
  const closeHandler = () => {
    dispatch(setIsNotification(false));
  }

  useErrors([{ error, isError }]);
  console.log("Notifications Data:", data);



  return (
    <Dialog open={isNotification} onClose={closeHandler}
      PaperProps={{
        sx: {
          background: "rgba(236, 227, 227, 0.97)", // Semi-transparent white
          backdropFilter: "blur(10px)", // Blurred background
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", // Soft shadow
          borderRadius: "15px", // Rounded corners
          padding: "2rem",
          border: "1px solid rgba(235, 231, 231, 0.97)", // Light border for glass effect
        }
      }}
    >
      <Stack p={{ xs: "1rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {isLoading ? (
  <Skeleton />
) : (
  <>
    {Array.isArray(data?.allRequests) && data.allRequests.length > 0 ? (
      data.allRequests
        .filter((req) => req?.sender && req.sender._id)
        .map((req) => (
          <NotificationItem
            sender={req.sender}
            _id={req._id.toString()}
            handler={friendRequestHandler}
            key={req._id.toString()}
          />
        ))
    ) : (
      <Typography textAlign={"center"}>0 Notifications</Typography>
    )}
  </>
)}

 




      </Stack>



    </Dialog>

  );

};


// const NotificationItem = memo(({ sender, _id, handler }) => {
//   const { namee, avatar } = sender;

//   return (
//     <ListItem>
//       <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"}>
//         <Avatar src={avatar} />
//         <Typography variant="body1" sx={{ flexGrow: 1, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis", width: "100%" }}>
//           {`${namee || "Unknown Name"} has sent you a friend request`}
//         </Typography>
//         <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
//         <Button onClick={() => handler({ _id, accept: false })} color="error">Reject</Button>
//       </Stack>
//     </ListItem>
//   );
// });




const NotificationItem = memo(({ sender, _id, senderId, receiverId, handler }) => {
  const { namee, avatar } = sender;

  return (
    <ListItem>
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"}>
        <Avatar src={avatar} />
        <Typography variant="body1" sx={{ flexGrow: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
          {`${namee || "Unknown"} has sent you a friend request`}
        </Typography>
        <Button onClick={() => handler({ _id, senderId: sender._id, accept: true })}>Accept</Button>
        <Button onClick={() => handler({ _id, senderId, receiverId, accept: false })} color="error">Reject</Button>
      </Stack>
    </ListItem>
  );
});






export default Notifications;






















