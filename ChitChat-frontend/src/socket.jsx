// import io from "socket.io-client";
// import { createContext, useMemo, useContext } from "react";
// import { server } from "./constants/configure";


// const SocketContext = createContext();

// const getSocket = () =>  useContext(SocketContext);

// const SocketProvider = ({ children }) => { 
    
// const socket = useMemo(() => io(server, {withCredentials: true }), []);

//  return  (
//     <SocketContext.Provider value={socket}>
//       {children}
//     </SocketContext.Provider>
//   );

// };  

// export { SocketProvider, getSocket };




import { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";
import { server } from "./constants/configure"; // Make sure this is without a trailing slash

const SocketContext = createContext();

export const getSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => {
    return io(server, {
      withCredentials: true,
      transports: ["websocket", "polling"], // 👈 add transports explicitly
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
