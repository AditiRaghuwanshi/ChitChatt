import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";




const Search = () => {
  const {isSearch} = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();
  const  [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation)

const dispatch = useDispatch();
const search = useInputValidation("");

  


const [users, setUsers] = useState([]);


const addFriendHandler = async (id) => {
await sendFriendRequest("Sending friend request...", { userId: id });
}

const searchCloseHandler = () => dispatch(setIsSearch(false))





useEffect(() => {
const timeOutId = setTimeout(() => {
  searchUser(search.value)
  .then(({data}) => setUsers(data.users))
  .catch((error) => console.log(error));
}, 1000);

return () => {
  clearTimeout(timeOutId);
}

}, [search.value, searchUser]);




  
  return <Dialog open={isSearch} onClose={searchCloseHandler}
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
    <Stack>
      <DialogTitle textAlign={"center"}>Find People</DialogTitle>
      <TextField label="" value={search.value} onChange={search.changeHandler}
      variant= "outlined" size="small"

      InputProps={{
        startAdornment:(
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      
      />

<List>     

{users.map((i) => (
  <UserItem
    user={i}
    key={i._id}
    handler={addFriendHandler}
    handlerIsLoading={isLoadingSendFriendRequest}
  />
))}


     

{/* {/* {Array.isArray(users) && users.map((i) => (
  <UserItem
    user={i}
    key={i._id}
    handler={addFriendHandler}
    handlerIsLoading={isLoadingSendFriendRequest} 



  
))} */}




    
     

</List>
    </Stack>
  </Dialog>
}
export default Search; 
















