import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import RoomProvider from "./resort/providers/RoomProvider.jsx";
import theme from "./theme.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider theme={theme}>
        <RoomProvider>
          <App />
        </RoomProvider>
      </ThemeProvider>
    </StrictMode>
    ,
  </BrowserRouter>,
);
