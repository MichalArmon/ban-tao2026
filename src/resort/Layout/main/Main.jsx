import { Box, Container } from "@mui/material";
import React from "react";

export default function Main({ children }) {
  return (
    <Container size="xl" sx={{ bgcolor: "background.default" }}>
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
    </Container>
  );
}
