// import {
//   useFileHandler,
//   useInputValidation,
//   useStrongPassword
// } from "6pp";
// import { CameraAlt as CameraAlticon } from "@mui/icons-material";
// import {
//   Avatar,
//   Box,
//   Button,
//   Container,
//   IconButton,
//   Stack,
//   TextField,
//   Typography,
//   useMediaQuery,
//   useTheme
// } from "@mui/material";
// import axios from "axios";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import image from "../assets/image.png";
// import image2 from "../assets/image2.png";
// import { VisuallyHiddenInput } from "../components/styles/Styled";
// import { server } from "../constants/configure";
// import { userExists } from "../redux/reducers/auth";
// import { usernameValidator } from "../utils/Validator";


  
//   const Login = () => {
//     const [isLogin, setIsLogin] = useState(true);
//     const [isLoading, setIsLoading] = useState(false);

//     const toggleLogin = () => setIsLogin(!isLogin);
  
//     const namee = useInputValidation("");
//     const username = useInputValidation("", usernameValidator);
//     const password = useStrongPassword();
//     const confirmpassword = useInputValidation("");
//     const bio = useInputValidation("");
//     const avatar = useFileHandler("single");
//     const dispatch = useDispatch();
    
  
//     const handleLogin = async(e) => {
//        e.preventDefault();
//       const toastId = toast.loading("Logging in...");
//        setIsLoading(true);
//        const config = {
//        withCredentials: true, 
//         headers: {
//           'Content-Type': 'application/json',
//         },
//        };

//        try{
//        const { data } = await axios.post(
//         `${server}/api/v1/user/login`,
//         {
//         username: username.value,
//         password: password.value,
//        },
//        config
     
      
//   );
//   dispatch(userExists(data.user));
//   toast.success(data.message, {
//     id: toastId,
//   });
// } catch(error) {
//     toast.error(error?.response?.data?.message|| "Something went wrong", {
//       id: toastId,
//     });
// } finally{
//   setIsLoading(false);
// }
//     };
    
    
// const handleSignup = async(e) => 
//     {
      
//       setIsLoading(true);
//       e.preventDefault();
//       const toastId = toast.loading("Signing in...");

//       const formData = new FormData();
//       formData.append("avatar", avatar.file);
//       formData.append("namee", namee.value);
//       formData.append("bio", bio.value);
//       formData.append("username", username.value);
//       formData.append("password", password.value);

//       const config = {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       };

//       try {
//         const {data} = await axios.post(
//           `${server}/api/v1/user/new`,
//           formData,
//            config
//           );
//            dispatch(userExists(data.user));
       
//           toast.success(data.message, {
//             id: toastId,
//           });
    

       
//       } catch (error) {
//         toast.error(error?.response?.data?.message || 
//           "something went wrong", {
//             id: toastId,
//           });
        

//       }
//       finally {
//         setIsLoading(false);
//       }
// };
  
//     const theme = useTheme();
//     // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm", "xs" , "md"));
//     const isSmallScreen = useMediaQuery("(max-width:600px)");

//     return (
//       <>
//         <Container
//           component="main"
//           maxWidth="xs"
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             height: isSmallScreen ? "100%" : "600px",
//             width: isSmallScreen ? "100%" : "400px",
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             background: isSmallScreen
//               ? "linear-gradient(to right, #FFDEE9, #B5FFFC)"
//               : "rgba(255, 255, 255, 0.2)",
//             backdropFilter: isSmallScreen ? "none" : "blur(5px)",
//             borderRadius: isSmallScreen ? "0%" : "10px",
           
//             border: isSmallScreen ? "none" : "1px solid rgba(255, 255, 255, 0.3)",
//             boxShadow: isSmallScreen
//               ? "0 4px 10px rgba(0,0,0,0.15)"
//               : "0 4px 6px rgba(0, 0, 0, 0.1)",
//             padding: "2rem",
//             zIndex: 2
//           }}
          
//         >
//           {isLogin ? (
//             <>
//               <Typography variant="h4" textAlign={"center"}>
//                 Login
//               </Typography>
  
//               <form onSubmit={handleLogin} className="form">
//                 <TextField
//                   required
//                   fullWidth
//                   label="username"
//                   margin="normal"
//                   variant="outlined"
//                   value={username.value}
//                   onChange={username.changeHandler}
//                 />
//                 {username.error && (
//                   <Typography color="error" variant="caption">
//                     {username.error}
//                   </Typography>
//                 )}
  
//                 <TextField
//                   required
//                   fullWidth
//                   label="Password"
//                   type="password"
//                   margin="normal"
//                   variant="outlined"
//                   value={password.value}
//                   onChange={password.changeHandler}
//                 />
//                 {password.error && (
//                   <Typography color="error" variant="caption">
//                     {password.error}
//                   </Typography>
//                 )}
  
//                 <Button
//                   sx={{
//                     marginBottom: "1rem",
//                     backgroundColor: "#FF5733",
//                     "&:hover": { backgroundColor: "#FF5733" }
//                   }}
//                   variant="contained"
//                   type="submit"
//                   fullWidth
//                   disabled={isLoading}
//                 >
//                   Login
//                 </Button>
//                 <Typography textAlign={"center"}>Or</Typography>
//                 <Button fullWidth variant="text" onClick={toggleLogin} disabled={isLoading}>
//                   Sign Up
//                 </Button>
//               </form>
//             </>
//           ) : (
//             <>
//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 justifyContent="center"
//                 spacing={2}
//               >
//                 <Typography variant="h5">Sign Up</Typography>
//                 <Box sx={{ position: "relative", display: "inline-block" }}>
//                   <Avatar
//                     sx={{ width: "4rem", height: "4rem", objectFit: "contain" }}
//                     src={avatar.preview}
//                   />
//                   <IconButton
//                     sx={{
//                       position: "absolute",
//                       bottom: 0,
//                       right: 0,
//                       width: "26px",
//                       height: "26px",
//                       color: "white",
//                       bgcolor: "rgba(0,0,0,0.5)",
//                       ":hover": {
//                         bgcolor: "rgba(0, 0, 0, 0.7)"
//                       }
//                     }}
//                     component="label"
//                   >
//                     <CameraAlticon fontSize="small" />
//                     <VisuallyHiddenInput
//                       type="file"
//                       onChange={avatar.changeHandler}
//                     />
//                   </IconButton>
//                 </Box>
//               </Stack>
  
//               {avatar.error && (
//                 <Typography
//                   m={"1rem auto"}
//                   color="error"
//                   variant="caption"
//                   display={"block"}
//                 >
//                   {avatar.error}
//                 </Typography>
//               )}
  
//               <form onSubmit={handleSignup}>
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     width: "100%",
//                     maxWidth: "400px"
//                   }}
//                 >
//                   <TextField
//                     required
//                     fullWidth
//                     label="Full namee"
//                     margin="normal"
//                     variant="outlined"
//                     value={namee.value}
//                     onChange={namee.changeHandler}
//                   />
//                   <TextField
//                     required
//                     fullWidth
//                     label="username"
//                     margin="normal"
//                     variant="outlined"
//                     value={username.value}
//                     onChange={username.changeHandler}
//                   />
//                   {username.error && (
//                     <Typography color="error" variant="caption">
//                       {username.error}
//                     </Typography>
//                   )}
  
//                   <TextField
//                     required
//                     fullWidth
//                     label="Bio"
//                     margin="normal"
//                     variant="outlined"
//                     value={bio.value}
//                     onChange={bio.changeHandler}
//                   />
  
//                   <div style={{ display: "flex", gap: "10px", width: "100%" }}>
//                     <TextField
//                       required
//                       fullWidth
//                       label="Password"
//                       type="password"
//                       margin="normal"
//                       variant="outlined"
//                       value={password.value}
//                       onChange={password.changeHandler}
//                     />
//                     <TextField
//                       required
//                       fullWidth
//                       label="Confirm Password"
//                       type="password"
//                       margin="normal"
//                       variant="outlined"
//                       value={confirmpassword.value}
//                       onChange={confirmpassword.changeHandler}
//                     />
//                   </div>
  
//                   <Button
//                     sx={{
//                       backgroundColor: "#FF5733",
//                       "&:hover": { backgroundColor: "#FF5733" }
//                     }}
//                     variant="contained"
//                     type="submit"
//                     fullWidth
//                     disabled={isLoading}
//                   >
//                     SignUp
//                   </Button>
  
//                   <Typography textAlign={"center"}>
//                     Already have an account?
//                   </Typography>
//                   <Button fullWidth variant="text" onClick={toggleLogin}  disabled={isLoading}>
//                     Login
//                   </Button>
//                 </div>
//               </form>
//             </>
//           )}
//         </Container>
  
//         {/* Background Images */}
//         {!isSmallScreen && (
//           <>
//             <Box
//               component="img"
//               src={image}
//               alt="Background 1"
//               sx={{
//                 position: "absolute",
//                 top: "23%",
//                 left: "10%",
//                 transform: "translate(-50%, -50%)",
//                 width: "73%",
//                 height: "auto",
//                 objectFit: "cover",
//                 zIndex: 1
//               }}
//             />
  
//             <img
//               src={image2}
//               alt="Background 2"
//               className="background2"
//               style={{
//                 position: "absolute",
//                 top: "75%",
//                 left: "82%",
//                 transform: "translate(-50%, -50%)",
//                 width: "28%",
//                 height: "auto",
//                 objectFit: "cover",
//                 zIndex: 1
//               }}
//             />
//           </>
//         )}
//       </>
//     );
//   };
  
//   export default Login;
  
import {
  useFileHandler,
  useInputValidation,
  useStrongPassword
} from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import image from "../assets/image.png";
import image2 from "../assets/image2.png";
import { VisuallyHiddenInput } from "../components/styles/Styled";
import { server } from "../constants/configure";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/Validator";
import api from "../redux/api/api";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const toggleLogin = () => setIsLogin(!isLogin);

  const namee = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useStrongPassword();
  const confirmpassword = useInputValidation("");
  const bio = useInputValidation("");
  const avatar = useFileHandler("single");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in...");
    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value
        },
        config
      );
      dispatch(api.util.resetApiState());
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: toastId
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Signing up...");

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("namee", namee.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );
      dispatch(api.util.resetApiState());
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: toastId
      });
    } finally {
      setIsLoading(false);
    }
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:1500px)");

  return (
    <>
      {/* Main Login/Signup Form Container */}
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: isSmallScreen ? "100%" : "600px",
          width: isSmallScreen ? "100%" : "400px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: isSmallScreen
            ? "linear-gradient(to right, #FFDEE9, #B5FFFC)"
            : "rgba(255, 255, 255, 0.2)",
          backdropFilter: isSmallScreen ? "none" : "blur(5px)",
          borderRadius: isSmallScreen ? "0%" : "10px",
          border: isSmallScreen ? "none" : "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: isSmallScreen
            ? "0 4px 10px rgba(0,0,0,0.15)"
            : "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "2rem",
          zIndex: 2
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h4" textAlign="center">
              Login
            </Typography>

            <form onSubmit={handleLogin}>
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                value={username.value}
                onChange={username.changeHandler}
              />
              {username.error && (
                <Typography color="error" variant="caption">
                  {username.error}
                </Typography>
              )}

              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={password.value}
                onChange={password.changeHandler}
              />
              {password.error && (
                <Typography color="error" variant="caption">
                  {password.error}
                </Typography>
              )}

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  mt: 2,
                  mb: 1,
                  backgroundColor: "#FF5733",
                  "&:hover": { backgroundColor: "#FF5733" }
                }}
                disabled={isLoading}
              >
                Login
              </Button>
              <Typography textAlign="center">Or</Typography>
              <Button
                fullWidth
                variant="text"
                onClick={toggleLogin}
                disabled={isLoading}
              >
                Sign Up
              </Button>
            </form>
          </>
        ) : (
          <>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >
              <Typography variant="h5">Sign Up</Typography>
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={avatar.preview}
                  sx={{ width: 64, height: 64 }}
                />
                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 26,
                    height: 26,
                    bgcolor: "rgba(0,0,0,0.5)",
                    color: "white",
                    ":hover": { bgcolor: "rgba(0,0,0,0.7)" }
                  }}
                >
                  <CameraAltIcon fontSize="small" />
                  <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                </IconButton>
              </Box>
            </Stack>

            {avatar.error && (
              <Typography color="error" variant="caption" mt={1}>
                {avatar.error}
              </Typography>
            )}

            <form onSubmit={handleSignup}>
              <TextField
                fullWidth
                label="Full Name"
                margin="normal"
                value={namee.value}
                onChange={namee.changeHandler}
              />
              <TextField
                fullWidth
                label="Username"
                margin="normal"
                value={username.value}
                onChange={username.changeHandler}
              />
              {username.error && (
                <Typography color="error" variant="caption">
                  {username.error}
                </Typography>
              )}
              <TextField
                fullWidth
                label="Bio"
                margin="normal"
                value={bio.value}
                onChange={bio.changeHandler}
              />
              <Stack direction="row" spacing={1}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  margin="normal"
                  value={confirmpassword.value}
                  onChange={confirmpassword.changeHandler}
                />
              </Stack>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#FF5733",
                  "&:hover": { backgroundColor: "#FF5733" }
                }}
                disabled={isLoading}
              >
                Sign Up
              </Button>
              <Typography textAlign="center" mt={1}>
                Already have an account?
              </Typography>
              <Button
                fullWidth
                variant="text"
                onClick={toggleLogin}
                disabled={isLoading}
              >
                Login
              </Button>
            </form>
          </>
        )}
      </Container>

      {/* Backgrounds - visible only on larger screens */}
      {!isSmallScreen && (
        <>
          <Box
            component="img"
            src={image}
            alt="Emoji Background"
            sx={{
              position: "absolute",
              top: "23%",
              left: "10%",
              transform: "translate(-50%, -50%)",
              width: "73%",
              zIndex: 1
            }}
          />
          <Box
            component="img"
            src={image2}
            alt="Decoration"
            sx={{
              position: "absolute",
              top: "75%",
              left: "82%",
              transform: "translate(-50%, -50%)",
              width: "28%",
              zIndex: 1
            }}
          />
        </>
      )}
    </>
  );
};

export default Login;
