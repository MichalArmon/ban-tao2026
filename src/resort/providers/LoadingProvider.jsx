import { Snackbar, Alert, CircularProgress, Box } from "@mui/material";
import { createContext, useContext, useState, useEffect } from "react";

// 1.create context
const LoadingContext = createContext();

// 2.create provider
export default function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // רקע חצי שקוף
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999, // מוודא שזה תמיד מעל הכל
          }}
        >
          <CircularProgress color="secondary" aria-label="Loading…" />
        </Box>
      )}
    </LoadingContext.Provider>
  );
}

// 3. create custom hook for using the context(optional)
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("You used the message context of the loading provider!");
  }
  return context;
};
