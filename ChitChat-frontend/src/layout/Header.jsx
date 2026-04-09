import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { candypink } from "../constants/color";

import { Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Menu as MenuIcon, Notifications as NotificationsIcon, Search as SearchIcon } from "@mui/icons-material";
import { lazy, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { server } from "../constants/configure";
import { userNotExists } from "../redux/reducers/auth";
// import SearchDialogg from "../components/specific/Search";
import axios from "axios";
import toast from "react-hot-toast";
import { setIsMobileMenuFriend, setIsNotification, setIsSearch, setIsNewGroup } from "../redux/reducers/misc";
import { resetNotificationCount } from "../redux/reducers/chat";


const  SearchDialog = lazy(() => import("../components/specific/Search"));
const NotificationDialog = lazy(() => import("../components/specific/Notifications"));
const NewGroupDialog = lazy(() => import("../components/specific/NewGroup"));

const Header = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {isSearch, isNotification, isNewGroup} = useSelector((state) => state.misc);
    const { notificationCount } = useSelector((state) => state.chat);
    
    const handleMobile = () => {
    
      
        dispatch(setIsMobileMenuFriend(true));

    }

    const openSearch = () => {
      dispatch(setIsSearch(true));
    }

    const openNewGroup = () => {
        dispatch(setIsNewGroup(true));
    }

    const openNotification = () => {
       dispatch(setIsNotification(true));
       dispatch(resetNotificationCount());
    }



    const logoutHandler = async() => {

       try{
        const {data} = await axios.get(`${server}/api/v1/user/logout`, {
            withCredentials: true,
        });
        dispatch(userNotExists());
       toast.success(data.message);
       } catch(error){
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong");
       
       }
    }

  const navigateToGroup = () => navigate("/groups")

  return (
      <>
        <Box sx={{ flexGrow: 1 }} height={"4rem"} >
            <AppBar position="static" sx={{
                // backgroundImage: gradiant,
                bgcolor: candypink,
            }} >
                <Toolbar>
                    <Typography
                        variant="h5"
                        sx={{
                            display: { xs: "none", sm: "block" },
                        }}

                    >
                        chitchat
                    </Typography>
                    <Box
                        sx={{
                            display: { xs: "block", sm: "none" },
                        }}


                    >
                        <IconButton color="inherit" onClick={handleMobile}>
                            <MenuIcon />
                        </IconButton>

                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                        }}
                    />
                    <Box>


                        <IconBtn
                            title={"Search"}
                            icon={<SearchIcon />}
                            onClick={openSearch}
                        />
                        <IconBtn
                            title={"New Group"}
                            icon={<AddIcon />}
                            onClick={openNewGroup}
                        />
                        <IconBtn
                            title={"Manage Group"}
                            icon={<GroupIcon />}
                            onClick={navigateToGroup}
                        />

                        <IconBtn
                            title={"Logout"}
                            icon={<LogoutIcon />}
                            onClick={logoutHandler}
                        />

                        <IconBtn
                            title={"Notifications"}
                            icon={<NotificationsIcon />}
                            onClick={openNotification}
                            value={notificationCount}
                        />





                    </Box>
                </Toolbar>

            </AppBar>
        </Box>

        {
            isSearch && (
                <Suspense fallback={< Backdrop open/>}>
                 
                   <SearchDialog />
                </Suspense>
              


            )
        }

{
            isNotification && (
                <Suspense fallback={< Backdrop open/>}>
                   <NotificationDialog />
                </Suspense>
              


            )
        }


{
            isNewGroup && (
                <Suspense fallback={< Backdrop open/>}>
                   <NewGroupDialog />
                </Suspense>
              


            )
        }



    </>
    );
};


const IconBtn = ({ title, icon, onClick, value }) => {
    return (
        <Tooltip title={title}>
            <IconButton color="inherit" size="large" onClick={onClick}>
                {value ? (
                <Badge badgeContent={value} color="error">
                     {icon} 
                     </Badge> 
                     ) : (
                     icon 
                     )}

            </IconButton>
        </Tooltip>
    )
}

export default Header;
