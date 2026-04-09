// import { Container, TextField, Typography, Button, IconButton, InputAdornment } from "@mui/material";
// import { useState } from "react";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import image from "../../assets/image.png";
// import image2 from "../../assets/image2.png";
// import { useStrongPassword } from "6pp";
// import { Navigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";




// const AdminLogin = () => {
//     const {isAdmin} = useSelector((state) => state.auth);
//     const dispatch = useDispatch();
//     const submitHandler = () => {
//         e.preventDefault();
//         dispatch(admibz)
//     }


//     const Password = useStrongPassword();
//     const [showPassword, setShowPassword] = useState(false);

//     const handleTogglePassword = () => {
//         setShowPassword((prev) => !prev);
//     };

//     if(isAdmin) return <Navigate to= "/admin/dashboard"/>

//     const handleLogin = (e) => {
//         e.preventDefault();
//         // Handle admin login logic here
//     };

//     return (
//         <>
//             <Container
//                 component="main"
//                 maxWidth="xs"
//                 style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     height: "70vh",
//                     marginLeft: "30%",
//                     zIndex: 2,
//                     position: "relative",
//                     marginTop: "80px"
//                 }}
//             >
//                 <div
//                     style={{
//                         padding: "2rem",
//                         width: "100%",
//                         backdropFilter: "blur(5px)",
//                         background: "rgba(255, 255, 255, 0.2)",
//                         borderRadius: "10px",
//                         border: "1px solid rgba(255, 255, 255, 0.3)",
//                         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                     }}
//                 >
//                     <Typography variant="h4" textAlign="center">
//                         Admin Login
//                     </Typography>
//                     <form onSubmit={handleLogin}>
//                         <TextField
//                             required
//                             fullWidth
//                             label="Password"
//                             type={showPassword ? "text" : "Password"}
//                             margin="normal"
//                             variant="outlined"
//                             value={Password.value}
//                             onChange={Password.changeHandler}
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <IconButton onClick={handleTogglePassword} edge="end">
//                                             {showPassword ? <VisibilityOff /> : <Visibility />}
//                                         </IconButton>
//                                     </InputAdornment>
//                                 ),
//                             }}
//                         />
//                         {Password.error && (
//                             <Typography color="error" variant="caption">
//                                 {Password.error}
//                             </Typography>
//                         )}
//                         <Button
//                             sx={{
//                                 marginTop: "1rem",
//                                 backgroundColor: "#FF5733",
//                                 "&:hover": { backgroundColor: "#FF5733" },
//                             }}
//                             variant="contained"
//                             type="submit"
//                             fullWidth
//                         >
//                             Login
//                         </Button>
//                     </form>
//                 </div>
//             </Container>

//             {/* Background Images */}
//             <img
//                 src={image}
//                 alt="Background 1"
//                 style={{
//                     position: "absolute",
//                     top: "23%",
//                     left: "10%",
//                     transform: "translate(-50%, -50%)",
//                     width: "73%",
//                     height: "auto",
//                     objectFit: "cover",
//                     zIndex: 1,
//                 }}
//             />
//             <img
//                 src={image2}
//                 alt="Background 2"
//                 style={{
//                     position: "absolute",
//                     top: "75%",
//                     left: "82%",
//                     transform: "translate(-50%, -50%)",
//                     width: "28%",
//                     height: "auto",
//                     objectFit: "cover",
//                     zIndex: 1,
//                 }}
//             />
//         </>
//     );
// };

// export default AdminLogin;




import { useInputValidation, useStrongPassword } from "6pp";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Container, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import image from "../../assets/image.png";
import image2 from "../../assets/image2.png";
import { adminLogin, getAdmin } from "../../redux/thunks/createAsyncthunk";
import { Navigate } from "react-router-dom";




const AdminLogin = () => {
    const {isAdmin} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
   const secretKey = useInputValidation("");

   

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(adminLogin(secretKey.value));
    }

    useEffect(() => {
        dispatch(getAdmin());
    }, [dispatch]);
    

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    if(isAdmin) return <Navigate to= "/admin/dashboard"/>

 

    return (
        <>
            <Container
                component="main"
                maxWidth="xs"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "70vh",
                    marginLeft: "30%",
                    zIndex: 2,
                    position: "relative",
                    marginTop: "80px"
                }}
            >
                <div
                    style={{
                        padding: "2rem",
                        width: "100%",
                        backdropFilter: "blur(5px)",
                        background: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "10px",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Typography variant="h4" textAlign="center">
                        Admin Login
                    </Typography>
                    <form onSubmit={submitHandler}>
                        <TextField
                            required
                            fullWidth
                            label="Secret Key"
                            type={showPassword ? "text" : "Password"}
                            margin="normal"
                            variant="outlined"
                            value={secretKey.value}
                            onChange={secretKey.changeHandler}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        
                        <Button
                            sx={{
                                marginTop: "1rem",
                                backgroundColor: "#FF5733",
                                "&:hover": { backgroundColor: "#FF5733" },
                            }}
                            variant="contained"
                            type="submit"
                            fullWidth
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </Container>

            {/* Background Images */}
            <img
                src={image}
                alt="Background 1"
                style={{
                    position: "absolute",
                    top: "23%",
                    left: "10%",
                    transform: "translate(-50%, -50%)",
                    width: "73%",
                    height: "auto",
                    objectFit: "cover",
                    zIndex: 1,
                }}
            />
            <img
                src={image2}
                alt="Background 2"
                style={{
                    position: "absolute",
                    top: "75%",
                    left: "82%",
                    transform: "translate(-50%, -50%)",
                    width: "28%",
                    height: "auto",
                    objectFit: "cover",
                    zIndex: 1,
                }}
            />
        </>
    );
};

export default AdminLogin;


