import { Box, Container } from "@mui/material";
import React from "react";

export default function Main({ children, paddingTop = 0 }) {
  return (
    <Box
      sx={{
        minHeight: "85vh",
        paddingTop: paddingTop,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
}
