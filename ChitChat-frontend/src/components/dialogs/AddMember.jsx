  import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sampleUsers } from "../../constants/sampleData"
import { useAsyncMutation, useErrors } from "../../hooks/hook"
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from "../../redux/api/api"
import { setIsAddMember } from "../../redux/reducers/misc"
import UserItem from "../shared/UserItem"


const AddMember = ({chatId, groupMembers=[]}) => {
     
    const dispatch = useDispatch()
     const { isAddMember } = useSelector((state) => state.misc);
     const { isError, isLoading, error, data } = useAvailableFriendsQuery(chatId)
    const [members, setMembers] = useState(sampleUsers);
    const [selectedMembers, setSelectedMembers] = useState([])
    const [addMembers, isLoadingAddMembers ] = useAsyncMutation(useAddGroupMembersMutation)
    

    const selectMemberHandler = (id) => {
        setSelectedMembers((prev) => 
        prev.includes(id) ? prev.filter((currElement) => currElement !==id)
                          : [...prev, id])
    }

    // const addMemberSubmitHandler = () => {
    //     addMembers("adding members", {members: selectedMembers, chatId})
    //  closeHandler();

    // }

    const addMemberSubmitHandler = async () => {
        const res = await addMembers("adding members", {members: selectedMembers, chatId});
        console.log("chatid konsi?", chatId);
      
        if (res?.data?.alreadyExists?.length > 0) {
          toast.info("Some users were already in the group");
        } else {
          toast.success("Members added successfully");
        }
      
        closeHandler();
        console.log("addMembers response", res);
      };

 

      
    const closeHandler = () => {
        dispatch(setIsAddMember(false));
        setSelectedMembers([]);
        setMembers([]);

    }

    const alreadyFriends = groupMembers.map((i) => i._id);
    

    const currentUserId = useSelector((state) => state.auth.user._id);

const availableFriends =
  data?.friends?.filter(
    (i) => i._id !== currentUserId && !alreadyFriends.includes(i._id)
  ) || [];

      
      
    
    useErrors([{ isError, error }]);
    // console.log("data", data);
  return (
   <Dialog open={isAddMember} onClose={closeHandler}>
    <Stack p={"1rem"} width={"19rem"} spacing={"1rem"} >
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
            {isLoading 
        ? (
        <Skeleton /> )
        :
        availableFriends.length > 0 
        ? availableFriends.map((i) => (
            <UserItem 
              key={i._id} 
              user={i} 
              handler={selectMemberHandler} 
              isAdded={selectedMembers.includes(i._id)}
            />
          ))
        : <Typography textAlign="center">No friends to add</Typography>
}
      

        </Stack>

    <Stack direction={"row"} justifyContent={"space-evenly"} alignItems={"center"} >
        <Button color={"error"} onClick={closeHandler}>Cancel</Button>

        <Button onClick={addMemberSubmitHandler} variant="contained" disabled={isLoadingAddMembers} > Submit Changes</Button>
    </Stack>
    </Stack>
    </Dialog>
  )
}

export default AddMember