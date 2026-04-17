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
import SessionProvider from "./resort/providers/SessionProvider.jsx";
import RecRuleProvider from "./resort/providers/RecRuleProvider.jsx";
import SessionReservationProvider from "./resort/providers/SessionReservationProvider.jsx";

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
                    <RecRuleProvider>
                      <SessionProvider>
                        <SessionReservationProvider>
                          <OrderProvider>
                            <App />
                          </OrderProvider>
                        </SessionReservationProvider>
                      </SessionProvider>
                    </RecRuleProvider>
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
