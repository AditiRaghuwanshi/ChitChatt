import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Done as DoneIcon,
    Edit as EditIcon,
    KeyboardBackspace as KeyboardBackspaceIcon,
    Menu as MenuIcon,
} from "@mui/icons-material";
import { Backdrop, Box, Button, CircularProgress, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { lazy, memo, Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AvatarCard from "../components/shared/AvatarCard";
import UserItem from "../components/shared/UserItem";
import { Link } from "../components/styles/Styled";
import { gradiant } from "../constants/color";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import { LayoutLoaders } from "../layout/Loaders";
import { useChatDetailsQuery, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation, useAddGroupMembersMutation, useDeleteGroupMutation } from "../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducers/misc";

const DeleteDialog = lazy(() => import("../components/dialogs/DeleteDialog"))
const AddMember = lazy(() => import("../components/dialogs/AddMember"))


const Groups = () => {


    const chatId = useSearchParams()[0].get("group");
    const dispatch = useDispatch();

    const { isAddMember } = useSelector((state) => state.misc);

    const [updateGroup, isLoadingGroupnamee ] = useAsyncMutation(useRenameGroupMutation)

    
    const [removeMember, isLoadingRemoveMember ] = useAsyncMutation(useRemoveGroupMemberMutation)
        
    const [deleteGroup, isLoadingDeleteGroup ] = useAsyncMutation(useDeleteGroupMutation)

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
    const [groupnamee, setGroupnamee] = useState("");
    const [groupnameeUpdatedValue, setGroupnameeUpdatedValue] = useState("");
    const [members, setMembers] = useState([]);
    
  
    const navigate = useNavigate(); 
    const myGroups = useMyGroupsQuery("");
    const groupDetails = useChatDetailsQuery(
        {chatId, populate: true},
        {skip: !chatId}
    
    );

    
 
    const openconfirmDeleteHandler = () => {
        setConfirmDeleteDialog(true);
          
    }
    const closeconfirmDeleteHandler = () => {
        setConfirmDeleteDialog(false);
         
    }

    // const isAddMember = false;
    const openAddMember = () => {
      dispatch(setIsAddMember(true))
    }

    ;


    const deleteHandler = () => {
        deleteGroup("deleting group...", chatId);
        navigate("/");
       closeconfirmDeleteHandler()
    };

    const removeMemberHandler = (userId) => {
        removeMember("removing member", {chatId, userId})
    };

    const addMemberHandler = (id) => {
       console.log("adding memebers", id)
    };


 
    const errors=[
        {
        isError: myGroups.isError,
        error: myGroups.error,
         },

         {
            isError: groupDetails.isError,
            error: groupDetails.error,
        }


];
    useErrors(errors)

    useEffect(() => {
        const groupData = groupDetails.data;
        if(groupData) {
            setGroupnamee(groupData.chat.namee);
            setGroupnameeUpdatedValue(groupData.chat.namee);
            setMembers(groupData.chat.members);

        }
        return () => {
            setGroupnamee("");
            setGroupnameeUpdatedValue("");
            setMembers([]);
            setIsEdit(false);

        };
    }, [groupDetails.data])

    const navigateBack = () => {
        navigate("/")
    };

    const handleMobile = () => {

        setIsMobileMenuOpen((prev)  => !prev)

    };

    const updateGroupnamee = () => {
        setIsEdit(false);
        updateGroup("updating group name", {chatId, namee: groupnameeUpdatedValue})
        
    }
    const handleMobileClose = () => setIsMobileMenuOpen(false);



    const IconBtns = (
        <>

            <Box
                sx={{
                    display: {
                        xs: "block",
                        sm: "none",
                        position: "fixed",
                        right: "1rem",
                        top: "1rem",
                    }
                }}>

                <IconButton onClick={handleMobile}>
                  <MenuIcon />
                </IconButton>
            </Box>


            <Tooltip title="Go Back">
                <IconButton
                    sx={{
                        position: "absolute",
                        top: "2rem", left: "2rem",
                        bgcolor: "bisque",
                        color: "white",
                        ":hover": {
                            bgcolor: "black",
                        }
                        // bgcolor: "#1c1c1c" , color: "white"
                    }}
                    onClick={navigateBack}

                >
                    <KeyboardBackspaceIcon />
                </IconButton>
            </Tooltip>

        </>
    );


const Groupnamee = (
<Stack direction={"row"} alignItems={"center"} justifyContent={"center"}
spacing={"1rem"} padding={"3rem"}>
    {isEdit ? (
        <>

        <TextField value={groupnameeUpdatedValue}
        onChange={
            (e)=>setGroupnameeUpdatedValue(e.target.value)
            } />
        <IconButton onClick={(updateGroupnamee)} disabled={isLoadingGroupnamee}>
            <DoneIcon />
        </IconButton>
        
        
        </>
    ) : (
        <>
        <Typography variant="h4" align="center">{groupnamee}</Typography>
        <IconButton 
        disabled={isLoadingGroupnamee}
        onClick={() => setIsEdit(true)}>
            <EditIcon />
        </IconButton>
        </>
    )}

</Stack> );

const ButtonGroup = <> 



 <Stack direction={{
  xs: "row-reverse", 
   sm: "row",

}} 


spacing={"1rem"}
p={{
    xs:"0", sm: "1rem",  md:" 1rem 4rem"
}}
> 


{/* <Stack direction={{ xs: "row-reverse", sm: "row" }} spacing={1} p={1}> */}

<Button size="large"  color="error" variant={"outlined"} startIcon={<DeleteIcon/>}
    onClick={deleteHandler}
    > Delete Group </Button>
    <Button size="large" variant="contained"  startIcon={<AddIcon/>}
     onClick={openAddMember}
    > Add Member</Button>
   
   


</Stack>



</>

    

    return myGroups.isLoading ? <LayoutLoaders /> : (
        <Grid container height={"100vh"} 
        sx={{ overflow: "hidden"}} >
            <Grid
                item
                sx={{
                    display: {
                        xs: "none",
                        sm: "block",
                    },
                 
                }}
                sm={4}
                // bgcolor={"bisque"}
            
                
            >
                <GroupList myGroups={myGroups?.data?.groups} chatId={chatId}/>
            </Grid>

            <Grid item xs={12} sm={8} sx={{
                display: "flex", flexDirection: "column",
                alignItems: "center", position: "relative", padding: "1rem 3rem",

            }}>
                {IconBtns}
                {groupnamee && 
                <>
                {Groupnamee}
                <Typography margin={"2rem"} alignSelf={"flex-start"} 
                variant="body1">
                    Members

                </Typography>
                <Stack maxWidth={"35rem"} width={"100%"} boxSizing={"border-box"} 
                padding={{sm: "1rem", xs:"0", md:"1rem 4rem",}} spacing={"2rem"} 
                height={"50vh"} overflow={"auto"}
                > 
                
                
                { isLoadingRemoveMember? 
                <CircularProgress />
                         :
                        members.map((i) => (
                        <UserItem user={i} key={i._id} isAdded
                        styling={{
                            boxShadow:"0 0 0.5rem rgba(0,0,0,0.2)",
                            padding: "1rem 2rem",
                            borderRadius: "1rem"
                        }}
                        handler={removeMemberHandler}
                        
                        />
                    ))
                }
                </Stack>

                {ButtonGroup}
                </>
                
            }
            </Grid>

            {
                isAddMember && 
                <Suspense fallback={<Backdrop open />}>
                    <AddMember chatId={chatId}
                  groupMembers={groupDetails?.data?.chat?.members || []}
                    />
                </Suspense>
            }
            {confirmDeleteDialog && (
                <Suspense fallback={<Backdrop open />}>
                     <DeleteDialog 
                     open={DeleteDialog}
                     handleClose={closeconfirmDeleteHandler}
                     deleteHandler={deleteHandler}
                     />

                </Suspense>
            )}
            <Drawer  sx={{
                display: {
                    xs: "block",
                    sm: "none",
                }
            }}
            
            open={isMobileMenuOpen} onClose={handleMobileClose}>
                 <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} w={"50vw"}/>
       

            </Drawer>
        </Grid>
    )
}

const GroupList = ({ w="100%", myGroups=[], chatId }) => (
    <Stack 
    width={w}
    sx={{
        backgroundImage: gradiant,
        height: "100vh",
        overflowY: "auto", // This ensures scrolling happens only inside GroupList
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "0.5rem",
    }}
    >
        {
            myGroups.length > 0 ? (
                myGroups.map((group) => <GroupListItem group={group} 
                key={group._id} chatId={chatId} />)
       ): (
        <Typography textAlign={"center"} padding="1rem">
            No Groups To Display
            </Typography>
       )
        }
    </Stack>

   
);

const GroupListItem = memo(({group, chatId}) => {
    const { namee, avatar, _id} = group;
    return (
     <Link to={`?group=${_id}`} 
     onClick={e=> {
        if(chatId === _id) e.preventDefault();
   
   }}>
    <Stack direction={"row"} spacing={"0.5rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar}/>
        <Typography>
            {namee}
        </Typography>

    </Stack>
    
    
    </Link>
    
    ); 
});







export default Groups









