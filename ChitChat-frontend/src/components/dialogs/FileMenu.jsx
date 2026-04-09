import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { setIsFileMenu, setIsUploadingLoader } from "../../redux/reducers/misc";
import {
  Image as ImageIcon,
  AudioFile as AudioFileIcon,
  VideoFile as VideoFileIcon,
  UploadFile as UploadFileIcon 

} from "@mui/icons-material";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useSendAttachmentsMutation } from "../../redux/api/api";

const FileMenu = ({anchorEl, chatId}) => {
  const { isFileMenu } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

 
const handleClose = () => {
  dispatch(setIsFileMenu(false));
};

const imageRef = useRef(null);
const audioRef = useRef(null);
const videoRef = useRef(null);
const fileRef = useRef(null);



const selectImage = () => imageRef.current?.click();
const selectAudio = () => audioRef.current?.click();
const selectVideo = () => videoRef.current?.click();
const selectFile = () =>  fileRef.current?.click();


const [sendAttachments] = useSendAttachmentsMutation()



const fileChangeHandler = async(e, key) => {

  const files = Array.from(e.target.files);
  if(files.length <= 0) return;
  if(files.length > 5) 
    return toast.error(`you can only send 5 ${key} at a time`); 
  
  dispatch(setIsUploadingLoader(true));
  const toastId = toast.loading(`sending ${key}...`);
  handleClose();

  try{
    const myForm = new FormData();
    myForm.append("chatId", chatId);
    files.forEach((file) => myForm.append("files", file))
    const res = await sendAttachments(myForm);

    if(res.data) toast.success(`${key} sent successfully`, {
      id: toastId });
      else toast.error(`failed to send ${key}`, {id: toastId})



  }catch(error){
    toast.error(error, {id: toastId});

  } finally { 
    dispatch(setIsUploadingLoader(false));
  }



};




  return (
   <Menu anchorEl = {anchorEl} open={isFileMenu}  onClose={handleClose}>
   <div style={{width: "10rem"}}>
   
   
       <MenuList>
        <MenuItem onClick={selectImage}>
        <Tooltip title="Image">
          <ImageIcon />
        </Tooltip>
        <ListItemText style={{marginLeft: "0.5rem"}}>
          Image
        </ListItemText>
        <input type="file" 
        multiple
        accept="image/png, image/jpeg, image/gif"
        style={{display: "none"}}
        onChange={(e) => fileChangeHandler(e, "image")}
        ref={imageRef}
         />
        </MenuItem>
      



      
        <MenuItem  onClick={selectAudio}>
        <Tooltip title="Audio">
          <AudioFileIcon />
        </Tooltip>
        <ListItemText style={{marginLeft: "0.5rem"}}>
          Audio
        </ListItemText>
        <input type="file" 
        multiple
        accept="image/png, image/jpeg, image/gif"
        style={{display: "none"}}
        onChange={(e) => fileChangeHandler(e, "audios")}
        ref={audioRef}
         />
        </MenuItem>
      



      
        <MenuItem onClick={selectVideo}>
        <Tooltip title="Video">
          <VideoFileIcon />
        </Tooltip>
        <ListItemText style={{marginLeft: "0.5rem"}}>
          Video
        </ListItemText>
        <input type="file" 
        multiple
        accept="video/mp4, video/webm, video/ogg"
        style={{display: "none"}}
        onChange={(e) => fileChangeHandler(e, "Videos")}
        ref={videoRef}
         />
        </MenuItem>
      


      
        <MenuItem onClick={selectFile}>
        <Tooltip title="File">
          <UploadFileIcon />
        </Tooltip>
        <ListItemText style={{marginLeft: "0.5rem"}}>
          File
        </ListItemText>
        <input type="file" 
        multiple
        accept="*"
        style={{display: "none"}}
        onChange={(e) => fileChangeHandler(e, "files")}
        ref={fileRef}
         />
        </MenuItem>
      </MenuList>

   </div>
   </Menu>
  )
}

export default FileMenu