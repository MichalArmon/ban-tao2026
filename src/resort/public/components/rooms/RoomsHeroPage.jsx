import { Box, Container, Stack, Typography, Button } from "@mui/material";

function RoomsHeroPage() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",

        height: { xs: "70vh", md: "68vh" },

        mb: { xs: 4, md: 6 },
      }}
    >
      <Box
        component="img"
        src="https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg"
        alt="Treatments hero"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "contrast(1.05) saturate(1.05)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack
          spacing={3}
          sx={{ color: "#fff", maxWidth: { xs: "100%", md: "70%" } }}
        >
          <Typography
            variant="overline"
            sx={{ letterSpacing: 2, opacity: 0.9 }}
          >
            Ban Tao Village &gt; Rooms
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              lineHeight: 1.1,
              textShadow: "0 6px 24px rgba(0,0,0,0.45)",
            }}
          >
            Your Sanctuary Awaits
          </Typography>

          <Typography variant="h6" sx={{ opacity: 0.95 }}>
            Thoughtfully designed spaces to rest, recharge, and connect with
            nature
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" size="large">
              BOOK YOUR STAY
            </Button>

            <Button variant="outlined" size="large" color="inherit">
              EXPLORE VILLAGE
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default RoomsHeroPage;
