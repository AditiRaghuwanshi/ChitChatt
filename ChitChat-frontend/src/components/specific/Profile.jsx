














// import { Avatar, Stack, Typography } from "@mui/material"
// import {
//   Face as FaceIcon,
//   AlternateEmail as AlternateEmailIcon,
//   CalendarMonth as CalendarIcon
// } from "@mui/icons-material"
// import moment from "moment"
// import { transformImage } from "../../lib/features"

// const Profile = ({ user }) => {
//   return (
//     <Stack spacing={"1rem"} direction={"column"} alignItems={"center"}>
//       <Avatar 
//         src={transformImage(user?.avatar?.url)}
//         sx={{
//           width: 80,
//           height: 80,
//           objectFit: "contain",
//           marginBottom: "0.5rem",
//           border: "5px solid white",
//         }} 
//       />

//       <ProfileCard text={user?.bio} heading={"Bio"} />
//       <ProfileCard text={user?.username} heading={"Username"} Icon={<AlternateEmailIcon />} />
//       <ProfileCard text={user?.namee} heading={"Name"} Icon={<FaceIcon />} />
//       <ProfileCard text={moment(user?.createdAt).fromNow()} heading={"Joined"} Icon={<CalendarIcon />} />
//     </Stack>
//   )
// }

// const ProfileCard = ({ text, Icon, heading }) => (
//   <Stack
//     direction={"row"}
//     alignItems={"center"}
//     spacing={"0.8rem"}
//     color={"white"}
//     textAlign={"center"}
//   >
//     {Icon && Icon}

//     <Stack>
//       <Typography variant="body1">{text}</Typography>
//       <Typography color={"gray"} variant="caption">{heading}</Typography>
//     </Stack>
//   </Stack>
// )

// export default Profile






import { Avatar, Stack, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as AlternateEmailIcon,
  CalendarMonth as CalendarIcon
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features";
import { dustyPink } from "../../constants/color";


const Profile = ({ user }) => {
  if (!user) return <Typography color="Purple">No user data available</Typography>;

 

  return (
    <Stack spacing="1rem" direction="column" alignItems="center">
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: 80,
          height: 80,
          objectFit: "contain",
          marginBottom: "0.5rem",
          border: "3px solid gray"
        }}
      />

      <ProfileCard text={user?.bio} heading="Bio" />
      <ProfileCard text={user?.username} heading="Username" Icon={<AlternateEmailIcon />} />
      <ProfileCard text={user?.namee} heading="Name" Icon={<FaceIcon />} />
      <ProfileCard text={moment(user?.createdAt).fromNow()} heading="Joined" Icon={<CalendarIcon />} />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing="0.8rem"
    color="dustyPink"
    textAlign="center"
  >
    {Icon && Icon}
    <Stack>
         
      <Typography variant="body1">{text || "N/A"}</Typography>
      <Typography color="Purple" variant="caption">{heading}</Typography>
    </Stack>
  </Stack>

  
);

export default Profile;
