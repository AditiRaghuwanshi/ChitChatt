
import AdminLayout from "../../layout/AdminLayout";
// import Table from "@mui/material";
import Table from "../../components/shared/Table"
import { useEffect, useState } from "react";
import { Avatar, Stack, Box, Skeleton } from "@mui/material";
import RenderAttachment from "../../components/shared/RenderAttachment"
import { fileFormat, transformImage } from "../../lib/features";
import moment from "moment";
import { useFetchData } from "6pp";
import { useErrors } from "../../hooks/hook";
import { server } from "../../constants/configure";




const columns = [
  { 
field: "id",
headernamee: "ID",
headerClassnamee: "table-header",
width: 200,
},


{
  field: "attachments",
  headernamee: "Attachments",
  headerClassnamee: "table-header",
  width: 200,
  renderCell: (params) => {
  
  const {attachments} = params.row;
  return attachments?.length > 0 
  ? attachments.map((i) => {

    const url = i.url;
    console.log("whats in it", i);
    const file = fileFormat(url);

    return (
    <Box>
      <a href={url}
      download
      target="_blank"
      style={{
        color: "black"
      }}
      >
        {RenderAttachment(file, url)}

      </a>
    </Box>
    );
  })
  
  : "No Attachments";
   },
  },

  {
    field: "content",
    headernamee: "Content",
    headerClassnamee: "table-header",
    width: 400,
  },
  {
  field: "sender",
  headernamee: "Sent By",
  headerClassnamee: "table-header",
  width: 200,
  renderCell: (params) => (
    <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
<Avatar alt={params.row.sender.namee} 
  src={params.row.sender.avatar} />
  <span>{params.row.sender.namee}</span>
    </Stack>
  
  ),
  },

  {
    field: "chat",
    headernamee: "Chat",
    headerClassnamee: "table-header",
    width: 220,
  },

  {
    field: "groupChat",
    headernamee: "Group Chat",
    headerClassnamee: "table-header",
    width: 100,
  },
  {
    field: "createdAt",
    headernamee: "Time",
    headerClassnamee: "table-header",
    width: 250,
  },



];

const MessageManagement = () => {

  const { loading, data, error } = useFetchData({
    url: `${server}/api/v1/admin/messages`,
    key: "dashboard-messages",
    credentials: "include", // ✅ include cookies for authentication
  });
  

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  
  const [ rows, setRows] = useState([]);
  useEffect(() => {
    if (data?.messages?.length) {
      const safeRows = data.messages
        .filter((i) => i && i._id) // filter out any null or invalid messages
        .map((i) => ({
          ...i,
          id: i._id,
          sender: {
            namee: i.sender?.namee || "Unknown",
            avatar: transformImage(i.sender?.avatar || "", 50),
          },
          createdAt: moment(i.CreatedAt).format("MMMM Do YYYY, h:mm:ss a"),
        }));
  
      setRows(safeRows);
    }
  }, [data]);
  
  return( 

  <AdminLayout>
    
    {loading ? 
 (<Skeleton height={"100vh"} /> ) : (
<Table heading={"All Messages"} 
  columns={columns}
  rows={rows} 
  rowHeight={200}
  />
    
  )}
  
</AdminLayout>
    
  
);
};

export default MessageManagement

