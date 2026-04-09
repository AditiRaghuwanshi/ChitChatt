import AdminLayout from "../../layout/AdminLayout"
import Table from "../../components/shared/Table"
import { useEffect, useState } from "react";
import { Avatar, Skeleton, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import {transformImage} from "../../lib/features"
import AvatarCard from "../../components/shared/AvatarCard"
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
  field: "avatar",
  headernamee: "Avatar",
  headerClassnamee: "table-header",
  width: 150,
  renderCell: (params) => {
 return <AvatarCard avatar={params.row.avatar} />
  },
  },

  {
    field: "namee",
    headernamee: "namee",
    headerClassnamee: "table-header",
    width: 300,
  },

  {
    field: "groupChat",
    headernamee: "Group Chat",
    headerClassnamee: "table-header",
    width: 300,
  },
  {
    field: "totalMembers",
    headernamee: "Total Members",
    headerClassnamee: "table-header",
    width: 120,
  },

  {
    field: "members",
    headernamee: "Members",
    headerClassnamee: "table-header",
    width: 300,
    renderCell: (params) => 
    <AvatarCard 
    max={100} 
    avatar={params.row.members.map(member => member.avatar)}
    />
  },

  {
    field: "totalMessages",
    headernamee: "Total Messages",
    headerClassnamee: "table-header",
    width: 120,
  },

  {
    field: "creator",
    headernamee: "Created By",
    headerClassnamee: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={"1rem"}>
         <Avatar 
      alt={params.row.creator.namee} 
      src={params.row.creator.avatar} />
       <span>
       {params.row.creator.namee}
       </span>

      </Stack>
     
      ),
  },




];


const ChatManagement = () => {


  const { loading, data, error } = useFetchData({
        url: `${server}/api/v1/admin/chats`,
        key: "dashboard-chats",
        credentials: "include", // ✅ include cookies for authentication
      });
      console.log("chatt" , data);
    
      useErrors([
        {
          isError: error,
          error: error,
        },
      ]);
      const stats = data?.stats;
  const { id } = useParams();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if(data) {
    setRows(
      data.chats.map((i) => ({
        ...i,
        id: i._id, // ✅ Use existing `id`
        avatar: i.avatar.map(img => transformImage(img, 50)),
        members: i.members.map(member => ({
          ...member,
          avatar: transformImage(member.avatar, 50) 
        })),
        creator: {
          namee: i.creator?.namee || "Unknown",
          avatar: transformImage(i.creator?.avatar || "", 50),
        }
        
      }))
    );
  } }, [data]);
  
  return (
  <AdminLayout>
  
    {
  loading ? 
  (<Skeleton height={"100vh"} /> ) : (
<Table heading={"All Chats"} columns={columns} rows={rows}
    />
  )
}
  </AdminLayout>
  );
}




export default ChatManagement
