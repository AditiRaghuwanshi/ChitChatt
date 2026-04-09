// import { AvatarGroup, Stack, Box, Avatar } from "@mui/material"
// import { transformImage } from "../../lib/features"

// const AvatarCard = ({ avatar = [], max = 4}) => {
//   return (
//     <div>
//      <Stack direction={"row"} spacing={0.5}>
//         <AvatarGroup max={max}
//         sx={{
//           position: "relative",
//         }}
        
//         >
//             <Box width={"5rem"} height={"3rem"}>

//                 {
//                     avatar.map((i, index) => (
//                         <Avatar

//                         key={Math.random() * 100}
//                         src={transformImage(i)}
//                         alt={`Avatar ${index}` }
//                         sx={{
//                             width: "3rem",
//                             height: "3rem",
//                              position: "absolute",
//                              left: {
//                                 xs: `${0.5 + index}rem`,
//                                 sm: `${index}rem`,
//                              },
//                         }}

//                         />

                
//                 ))}



//             </Box>

//         </AvatarGroup>



//      </Stack>
//     </div>
//   )
// }

// export default AvatarCard








import { Avatar, Box, Typography } from "@mui/material";
import { transformImage } from "../../lib/features";

const AvatarCard = ({ avatar = [] }) => {
  const maxToShow = 2;
  const extraCount = avatar.length - maxToShow;

  return (
    <Box sx={{ display: "flex", alignItems: "center", position: "relative", width: "fit-content" }}>
      {avatar.slice(0, maxToShow).map((img, index) => (
        <Avatar
          key={index}
          src={transformImage(img)}
          sx={{
            width: 40,
            height: 40,
            zIndex: avatar.length - index,
            position: "relative",
            left: `-${index * 10}px`,
            border: "2px solid white",
            fontSize: "1rem",
          }}
        />
      ))}

      {extraCount > 0 && (
        <Box
          sx={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            left: `-${maxToShow * 10}px`,
            zIndex: 0,
            fontWeight: 600,
            fontSize: "0.9rem",
          }}
        >
          +{extraCount}
        </Box>
      )}
    </Box>
  );
};

export default AvatarCard;

