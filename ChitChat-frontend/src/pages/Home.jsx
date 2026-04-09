import { Box, Typography } from "@mui/material";
import Applayout from "../layout/Applayout";
import { gray } from "../constants/color";

const Home = () => {
  return (
    <Box bgcolor={gray} height={"100%"}
      display="flex"
      justifyContent="center" // Centers horizontally
     
      >
      <Typography p="1rem" variant="h5" textAlign="center">
        Select a friend to chat
      </Typography>
    </Box>
  );
};

export default Applayout(Home);

