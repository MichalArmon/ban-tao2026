import { Box } from "@mui/material";
import React from "react";

export default function Main({ children }) {
  return (
    <Box
      sx={{
        minHeight: "85vh",
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
}
