// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { server } from "../../constants/configure";
// import axios from "axios";

// const adminLogin = createAsyncThunk("admin/login", async(secretKey) => {
//     try {
//         const config = {
//             withCredentials: true,
//             headers:{
//                 "Content-Type":  "application/json",
//             },
          
//         };
//         const {data}= await axios.post (
//             `${server}/api/v1/admin/verify`,
//             {secretKey},
//             config
          
//         )
//         return data.message;
//     } catch(error) {
//         console.log("error", error.response.data.message)
//         throw error.response.data.message;
//     }

// });

// export {adminLogin};












import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../constants/configure";
import axios from "axios";

const adminLogin = createAsyncThunk(
  "admin/login",
  async (secretKey, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${server}/api/v1/admin/verify`,
        { secretKey },
        config
      );

      return data.message;

    } catch (error) {
      const message = error?.response?.data?.message || "Unknown error";
      console.log("error", message);
      return rejectWithValue(message);
    }
  }
);





const getAdmin = createAsyncThunk(
    "admin/getAdmin",
    async () => {
      try {
       const { data } = await axios.get(
          `${server}/api/v1/admin/`, {
          withCredentials: true,
          });
  
        return data.admin;
  
      } catch (error) {
        throw error.response.data.message;
      }
    });



    const adminLogout = createAsyncThunk(
        "admin/logout",
        async () => {
          try {
           const { data } = await axios.get(
              `${server}/api/v1/admin/logout`, {
              withCredentials: true,
              });
      
            return data.message;
      
          } catch (error) {
            return rejectWithValue(message);
          }
        });

export { adminLogin, getAdmin, adminLogout };






