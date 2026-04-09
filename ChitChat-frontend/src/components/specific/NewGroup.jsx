// import CancelIcon from "@mui/icons-material/Cancel";
// import GroupAddIcon from "@mui/icons-material/GroupAdd";
// import PersonIcon from "@mui/icons-material/Person";
// import {
//   Avatar, Button,
//   Chip,
//   Dialog, DialogTitle,
//   InputAdornment,
//   ListItemButton,
//   Skeleton,
//   Stack, TextField, Typography
// } from "@mui/material";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useAsyncMutation, useErrors } from "../../hooks/hook";
// import { useAvailableFriendsQuery, useNewGroupMutation } from "../../redux/api/api";
// import { setIsNewGroup } from "../../redux/reducers/misc";
// import { useInputValidation } from "6pp";
// import { Group } from "@mui/icons-material";
// import UserItem from "../shared/UserItem";
// import { sampleUsers } from "../../constants/sampleData";

// const NewGroup = () => {
//   const dispatch = useDispatch();
//   const { isNewGroup } = useSelector((state) => state.misc);
//  const [members, setMembers] = useState(sampleUsers);
//   const { isError, isLoading, error, data } = useAvailableFriendsQuery()
//   const [newGroup, newGroupLoding] = useAsyncMutation(useNewGroupMutation)
//   const [selectedMembers, setSelectedMembers] = useState([]);


//   const groupName = useInputValidation("");
//   console.log(data);

//   const errors = [{
//     isError,
//     error,
//   }];

//   useErrors(errors);

//   const selectMemberHandler = (id) => {
//    setSelectedMembers((prev) =>
//     prev.includes(id) 
//    ? prev.filter((currElement) => currElement !== id)
//   : [...prev, id])

//   }

//   const submitHandler = () => {
//     if(!groupName.value) return toast.error("Please enter group name")
//     if(selectedMembers.length < 2) return toast.error("Please select at least one member")
    

//     newGroup("creating new group...", {namee: groupName.value, members: selectedMembers });
//     closeHandler()
//    };
//   const closeHandler = () => {
//     dispatch(setIsNewGroup(false))
//    };


//   // Handler to select/deselect members
//   const selectionOfMembers = (user) => {
//     setSelectedMembers((prev) => {
//       return prev.some((m) => m._id === user._id) ? prev.filter((m) => m._id !== user._id) : [...prev, user]

//     })
//   }
  

//   return (
//     <Dialog  onClose={closeHandler} open={isNewGroup}
//       PaperProps={{
//         sx: {
//           background: "rgba(236, 227, 227, 0.97)", // Semi-transparent white
//           backdropFilter: "blur(10px)", // Blurred background
//           boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", // Soft shadow
//           borderRadius: "15px", // Rounded corners
//           padding: "2rem",
//           border: "1px solid rgba(235, 231, 231, 0.97)", // Light border for glass effect
//         }
//       }}>
//       <Stack>
//         <DialogTitle textAlign="center">Create New Group</DialogTitle>

//         {/* Group namee Input */}
//         <TextField
//           label="Group namee"
//           placeholder="Enter group name"
//           value={groupName.value}
//           onChange={groupName.changeHandler}
//           variant="outlined"
//           fullWidth
//           sx={{ mb: 2 }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <PersonIcon />
//               </InputAdornment>
//             ),
//           }}
//         />

//         {/* Selected Members List */}
//         {selectedMembers.length > 0 && (
//           <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
//             {isLoading ?
//               (
//                 <Skeleton />
//               ) : (
//                 selectedMembers.map((member) => (
//                   <Chip
//                     key={member._id}
//                     label={member.namee}
//                     avatar={<Avatar src={member.avatar} />}
//                     onDelete={() => selectionOfMembers(member)}
//                   />
//                 )))}
//           </Stack>
//         )}

//         {/* Member Selection List (Scrollable) */}
//         <Typography variant="body1" fontWeight="bold" mb={1}>Select Members</Typography>
//         <Stack maxHeight="12rem" overflow="auto" spacing={1} sx={{ border: "1px solid #ddd", p: 1, borderRadius: 2 }}>
//           {/* {data?.friends?.map((user) => (
//             // <ListItem 
//             //   key={user._id} 
//             //   button 
//             //   onClick={() =>  selectionOfMembers(user)}
//             //   sx={{
//             //     bgcolor: selectedMembers.some((m) => m._id === user._id) ? "lightblue" : "transparent",
//             //     borderRadius: 1
//             //   }}
//             // >
//             //   <Avatar src={user.avatar[0]} sx={{ mr: 2 }} />
//             //   <Typography>{user.namee}</Typography>
//             // </ListItem>

//             <ListItemButton
//               key={user._id}
//               onClick={() => selectionOfMembers(user)}
//               sx={{
//                 bgcolor: selectedMembers.some((m) => m._id === user._id) ? "lightblue" : "transparent",
//                 borderRadius: 1
//               }}
//             >
//               <Avatar src={data?.friends?.avatar} sx={{ mr: 2 }} />
//               <Typography>{user.namee}</Typography>
//             </ListItemButton>

//           ))} */}


//           {isLoading ? (
//             <Skeleton />
//           ) : (
//             members.map((i) => (
//               <UserItem 
//               user={i}
//               key={i._id}
//               handler={selectMemberHandler}
//               isAdded={selectedMembers.includes(i._id)}
//               />
//             ))
//           )}
//         </Stack>

//         {/* Action Buttons */}
//         <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
//           <Button variant="contained" color="primary" fullWidth startIcon={<GroupAddIcon />}
//             onClick={submitHandler}
//             disabled={newGroupLoding}
//           >
//             Create
//           </Button>
//           <Button variant="outlined" color="error" fullWidth startIcon={<CancelIcon />}
//             onClick={closeHandler}>
//             Cancel
//           </Button>
//         </Stack>
//       </Stack>
//     </Dialog>
//   );
// };

// export default NewGroup;














import CancelIcon from "@mui/icons-material/Cancel";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation
} from "../../redux/api/api";
import { setIsNewGroup } from "../../redux/reducers/misc";
import { useInputValidation } from "6pp";
import UserItem from "../shared/UserItem";
import toast from "react-hot-toast";

const NewGroup = () => {
  const dispatch = useDispatch();
  const { isNewGroup } = useSelector((state) => state.misc);
  const { user } = useSelector((state) => state.auth); // assuming current user is stored in Redux
  const currentUserId = user?._id;

  const groupName = useInputValidation("");
  const [selectedMembers, setSelectedMembers] = useState([]);


  const chatId = null; // or undefined
  const { isError, isLoading, error, data } = useAvailableFriendsQuery(chatId);
  
  const [newGroup, newGroupLoding] = useAsyncMutation(useNewGroupMutation);



  useErrors([{ isError, error }]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Please enter group name");
    if (selectedMembers.length < 1)
      return toast.error("Please select at least one member");

    newGroup("Creating new group...", {
      namee: groupName.value,
      members: selectedMembers
    });

    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
    setSelectedMembers([]);
  };

  // Filter available friends and remove current user
  const members =
  data?.friends?.filter((user) => String(user._id) !== String(currentUserId)) || [];


console.log("Current User ID:", currentUserId);
console.log("Friend IDs:", data?.friends.map(f => f._id));
console.log("Friends from API:", data?.friends);



  return (
    <Dialog
      onClose={closeHandler}
      open={isNewGroup}
      PaperProps={{
        sx: {
          background: "rgba(236, 227, 227, 0.97)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          borderRadius: "15px",
          padding: "2rem",
          border: "1px solid rgba(235, 231, 231, 0.97)"
        }
      }}
    >
      <Stack>
        <DialogTitle textAlign="center">Create New Group</DialogTitle>

        {/* Group Name Input */}
        <TextField
          label="Group Name"
          placeholder="Enter group name"
          value={groupName.value}
          onChange={groupName.changeHandler}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            )
          }}
        />

        {/* Selected Members */}
        {/* {selectedMembers.length > 0 && (
          <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
            {selectedMembers.map((id) => {
              const member = members.find((m) => m._id === id);
              if (!member) return null;
              return (
                <Chip
                  key={id}
                  label={member.namee}
                  avatar={<Avatar src={member.avatar} />}
                  onDelete={() => selectMemberHandler(id)}
                />
              );
            })}
          </Stack>
        )} */}



        {selectedMembers.length > 0 && (
  <Stack direction="row" spacing={1} mb={2} flexWrap="wrap" alignItems="center">
    {selectedMembers.slice(0, 3).map((id) => {
      const member = members.find((m) => m._id === id);
      if (!member) return null;
      return (
        <Chip
          key={id}
          label={member.namee}
          avatar={<Avatar src={member.avatar} />}
          onDelete={() => selectMemberHandler(id)}
        />
      );
    })}
    {selectedMembers.length > 3 && (
      <Chip
        label={`+${selectedMembers.length - 3} more`}
        color="primary"
        variant="outlined"
      />
    )}
  </Stack>
)}


        {/* Members List */}
        <Typography variant="body1" fontWeight="bold" mb={1}>
          Select Members
        </Typography>
        <Stack
          maxHeight="12rem"
          overflow="auto"
          spacing={1}
          sx={{ border: "1px solid #ddd", p: 1, borderRadius: 2 }}
        >
          {isLoading ? (
            <Skeleton />
          ) : members.length > 0 ? (
            members.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign="center" color="text.secondary">
              No friends available
            </Typography>
          )}
        </Stack>

        {/* Buttons */}
        <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<GroupAddIcon />}
            onClick={submitHandler}
            disabled={newGroupLoding}
          >
            Create
          </Button>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            startIcon={<CancelIcon />}
            onClick={closeHandler}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
