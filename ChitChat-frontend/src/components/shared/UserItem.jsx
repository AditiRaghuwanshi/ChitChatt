import { Avatar, IconButton, Typography, Stack, ListItem } from "@mui/material"
import { transformImage } from "../../lib/features.js"
import { memo } from "react"
import { Add as AddIcon,
    Remove as RemoveIcon 
 } from "@mui/icons-material"



const UserItem = ({user, handler, handlerIsLoading, isAdded, styling = {}}) => {
    const {namee, _id, avatar} = user
    // console.log("Avatar data:", avatar);


  return (
    <ListItem>
    <Stack 
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    width={"100%"}
    {...styling}

    
    >
        {/* <Avatar src={transformImage(avatar)} /> */}
     

        <Avatar src={transformImage(Array.isArray(avatar) ? avatar[0] : avatar)} />

        <Typography variant="body1" 
        sx={{
            flexGlow: 1,
            display: "-webkit-box",
            webkitLineClamp: 1,
            webkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
         
         
              
        

        }}

        >{namee}</Typography>
        <IconButton 
        size="small"
        sx={{
            bgcolor:isAdded ? "error.main" : "primary.main",
            color:"white",
            "&:hover": {
                bgcolor:isAdded ? "error.dark" : "primary.dark",
            },
        }}

        
        onClick={() => handler(_id)} disabled={handlerIsLoading}>
            {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
    </Stack>

   </ListItem>
  )
}

export default memo(UserItem)





// import { Avatar, IconButton, Typography, Stack, ListItem } from "@mui/material";
// import { memo } from "react";
// import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

// const UserItem = ({ user, handler, handlerIsLoading, isAdded, styling = {} }) => {
//     const { namee, _id, avatar } = user;

//     return (
//         <ListItem>
//             <Stack 
//                 direction="row"
//                 alignItems="center"
//                 spacing={1}  // Changed from "1rem" to 1 for consistency
//                 width="100%"
//                 {...styling}
//             >
//                 {/* Avatar with user image */}
//                 <Avatar src={avatar} alt={namee} />

//                 {/* namee Typography with proper truncation */}
//                 <Typography 
//                     variant="body1"
//                     sx={{
//                         flexGrow: 1,
//                         display: "block",
//                         whiteSpace: "nowrap",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                     }}
//                 >
//                     {namee}
//                 </Typography>

//                 {/* Add/Remove Button */}
//                 <IconButton 
//                     size="small"
//                     sx={{
//                         bgcolor: isAdded ? "error.main" : "primary.main",
//                         color: "white",
//                         "&:hover": {
//                             bgcolor: isAdded ? "error.dark" : "primary.dark",
//                         },
//                     }}
//                     onClick={() => handler(_id)}
//                     disabled={handlerIsLoading}
//                 >
//                     {isAdded ? <RemoveIcon /> : <AddIcon />}
//                 </IconButton>
//             </Stack>
//         </ListItem>
//     );
// };

// export default memo(UserItem);
