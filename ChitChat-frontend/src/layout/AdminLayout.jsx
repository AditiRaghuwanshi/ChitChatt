//alt + shift + O

import {
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  Group as GroupIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Message as MessageIcon
} from "@mui/icons-material";
import { Box, Drawer, Grid, IconButton, Stack, Typography, styled } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as LinkComponent, Navigate, useLocation } from "react-router-dom";
import { adminLogout } from "../redux/thunks/createAsyncthunk";


const Link = styled(LinkComponent)`
text-decoration: none;
border-radius: 2rem;
padding: 1rem 2rem;
color: black;
&:hover {
color: rgba(75, 23, 23, 0.49);
}


`;


export const adminTabs =[
  {
    namee:"Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />
},
{
  namee:"Users",
  path: "/admin/users",
  icon: <ManageAccountsIcon />
},
{
  namee:"Chats",
  path: "/admin/chats",
  icon: <GroupIcon />
},
{
  namee:"Messages",
  path: "/adminmessages",
  icon: <MessageIcon />
}
]












const Sidebar = ({lg: w = "100%"}) => {

  const location = useLocation();
  const dispatch = useDispatch();



  const LogoutHandler = () => {
    dispatch(adminLogout())
  }
      return(
      
      <Stack width={w} direction={"column"} p={"2rem"} 
      spacing={"3rem"}> 
      <Typography variant="h5" textTransform={"uppercase"}>
        ChatarPatar
      </Typography>

      <Stack spacing={"1rem"}>
        {adminTabs.map((mapp) => 
        <Link key={mapp.path} to={mapp.path} 
        sx={
          location.pathname === mapp.path && {
            bgcolor: "#DCAE96",
            color: "white",
            ":hover": { color: "white"},
          }
        }
        
        
        
        >
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
           {mapp.icon}

           <Typography>{mapp.namee}</Typography>
          </Stack>
        </Link>)}

        <Link onClick={LogoutHandler}>
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
          <ExitToAppIcon />
          <Typography >LogOut</Typography>
        </Stack>
        
        </Link>





      </Stack>
      
      
      </Stack>

      )

    
};




const AdminLayout = ({children}) => {

  const { isAdmin } = useSelector((state) => state.auth);
  const [ isMobile, setIsMobile] = useState(false);
 
  const handleMobile = () => setIsMobile(!isMobile);
  const handleClose = () => setIsMobile(false)
  if (!isAdmin) return <Navigate to="/admin" />


  return (

  
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none"},
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
        >
          <IconButton onClick={handleMobile}>
         {
          isMobile ? <CloseIcon /> : <MenuIcon />
         }
          </IconButton>
         
      </Box>
      <Grid 
      item
      md={4}
      
      lg={3}
      sx={{ display: {xs: "none", md:"block"}}} 
      >
        <Sidebar />
      
        </Grid>
      
      <Grid 
      item
      xs={12}
      md={8}
      lg={9}
      sx={{
        bgcolor: "#DCAE96",
      }}
      > {children} </Grid>


      <Drawer open ={isMobile} onClose={handleClose}>
        <Sidebar w={"50vw"} />

      </Drawer>


    </Grid>
   
  )
}

export default AdminLayout