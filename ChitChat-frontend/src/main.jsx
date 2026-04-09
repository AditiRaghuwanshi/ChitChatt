// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css"
// import { CssBaseline } from "@mui/material";
// import { HelmetProvider } from "react-helmet-async";
// import {Provider} from "react-redux";
// import store from "./redux/store.js";


// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <Provider store={store}>
      
   
//   <HelmetProvider>
     
//       <CssBaseline />
//       <div onContextMenu={(e) => e.preventDefault()}>
//       <App />
//       </div>
    
//     </HelmetProvider>
  

//     </Provider>



//   </StrictMode>
// );








import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./redux/store.js";

const theme = createTheme({
 
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div onContextMenu={(e) => e.preventDefault()}>
            <App />
          </div>
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  </StrictMode>
);











