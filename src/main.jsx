import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import RoomProvider from "./resort/providers/RoomProvider.jsx";

import theme from "./theme.js";
import TreatmentProvider from "./resort/providers/TreatmentProvider.jsx";
import UserProvider from "./resort/providers/UserProvider.jsx";
import SnackBarProvider from "./resort/providers/SnackBarProvider.jsx";
import WorkshopProvider from "./resort/providers/WorkshopProvider.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import OrderProvider from "./resort/providers/OrderProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SnackBarProvider>
            <UserProvider>
              <WorkshopProvider>
                <TreatmentProvider>
                  <RoomProvider>
                    <OrderProvider>
                      <App />
                    </OrderProvider>
                  </RoomProvider>
                </TreatmentProvider>
              </WorkshopProvider>
            </UserProvider>
          </SnackBarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </LocalizationProvider>
  </StrictMode>,
);
