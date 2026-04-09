import { lazy, Suspense, useEffect } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import { LayoutLoaders } from "./layout/Loaders";
import axios from "axios";
import { server } from "./constants/configure";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth";
import Applayout from "./layout/Applayout";

const Home = lazy(() => import ("./pages/Home"));
const Login = lazy(() => import ("./pages/Login"));
const Chat =  lazy(() => import ("./pages/Chat"));

const Groups =  lazy(() => import ("./pages/Groups"));
const Notfound = lazy(() => import("./pages/Notfound"));

const AdminLogin = lazy(() => import ("./pages/Admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"))
const MessageManagement = lazy(() => import ("./pages/Admin/MessageManagement"));
const ChatManagement = lazy(() => import ("./pages/Admin/ChatManagement"));
const UserManagement = lazy(() => import ("./pages/Admin/UserManagement"));
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./socket";



// let user = true;

const App = () => {

  const {user, loader} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  
const ChatWithLayout = Applayout(Chat); 
 
const api = async function implementApi() {
        try {
         const handleApi = await fetch(`${server}/api/v1/user/me`,{withCredentials: true})
        const convert = await handleApi.json()
        dispatch(userExists(convert))
        }catch{
          const handleError = dispatch(userNotExists())
        }
        

}
useEffect(() => {
    
  
    api()
    // axios
    // .get(`${server}/api/v1/user/me`,{withCredentials: true} )
    // .then(({data}) => dispatch(userExists(data.user)))
    // .catch((err) => dispatch(userNotExists()));

    
    
  }, [dispatch]);


  return loader? ( 
  <LayoutLoaders />
  ) : (
   
     <BrowserRouter>
     <Suspense fallback={<LayoutLoaders/> }>
     <Routes>
      <Route element={
        <SocketProvider>
          <ProtectRoute user={user}/>
        </SocketProvider>
      }>
      <Route path="/" element={<Home />} />
      <Route path="/chat/:chatId" element={<ChatWithLayout />} />

      <Route path="/chat/:id" element={< Chat/>} />
      <Route path="/groups" element={< Groups/>} />
      
      </Route>
      
     <Route path="/login" element={

      <ProtectRoute user={!user}  redirect="/">
            <Login />
      </ProtectRoute>
     } />

     <Route path="/admin" element={<AdminLogin />} />
     <Route path="/admin/dashboard" element={<AdminDashboard />} />
     <Route path="/admin/users" element={<UserManagement />} />
     <Route path="/admin/chats" element={<ChatManagement />} />
     <Route path="/adminmessages" element={<MessageManagement />} />
     

      <Route path="*" element={<Notfound />} />
    </Routes>
     
    </Suspense>
     <Toaster position="top-right" />
     
     </BrowserRouter>


  );
};

export default App

