import { Snackbar, Alert } from "@mui/material";
import { createContext, useContext, useState, useEffect } from "react";

// 1.create context
const SnackBarContext = createContext();

// 2.create provider
export default function SnackBarProvider({ children }) {
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackColor, setSnackColor] = useState("success");
  const [snackVariant, setSnackVariant] = useState("filled");
  const [snackMessage, setSnackMessage] = useState("in snackbar");

  const setSnack = (color, message, variant = "filled") => {
    setSnackColor(color);
    setSnackMessage(message);
    setIsSnackOpen(true);
    setSnackVariant(variant);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackOpen(false);
  };

  return (
    <SnackBarContext.Provider value={{ setSnack }}>
      {children}

      <Snackbar
        open={isSnackOpen}
        onClose={handleClose}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackColor}
          sx={{
            width: "100%",
            borderRadius: 2,
            boxShadow: 3,
            fontSize: "1.1rem",
          }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  );
}

// 3. create custom hook for using the context(optional)
export const useSnackBar = () => {
  const context = useContext(SnackBarContext);
  if (!context) {
    throw new Error("You used the message context of the room provider!");
  }
  return context;
};
