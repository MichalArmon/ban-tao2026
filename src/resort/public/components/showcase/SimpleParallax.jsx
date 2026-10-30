import { Box } from "@mui/material";

export default function SimpleParallax({ image, children, height = "150vh" }) {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: height,
        position: "relative",
        backgroundImage: `url("${image}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: {
          xs: "scroll",
          md: "fixed",
        },
      }}
    >
      <Box
        sx={{
          minHeight: height,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
