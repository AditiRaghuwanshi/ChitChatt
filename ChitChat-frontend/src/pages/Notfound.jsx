import React from 'react'
import {Error as ErrorIcon} from "@mui/icons-material"
import { Typography, Container, Stack} from '@mui/material'
import { Link } from "react-router-dom"; // ✅ Add this


const Notfound = () => {
  return (
   <Container maxWidth="lg" sx={{height: "100vh"}}>
    <Stack alignItems={"center"} 
    spacing={"2rem"} 
    justifyContent={"center"} 
    h="100%">
      <ErrorIcon sx={{fontSize: "10rem"}} />
        <Typography variant="h1"> 404 </Typography>
        <Typography variant="h3"> NOT FOUND </Typography>
        <Link to="/">Go back to Home</Link>


    </Stack>
   </Container>
   
  )
}

export default Notfound
