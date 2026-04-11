import { Box, Container, Stack, Typography, Button } from "@mui/material";

function WorkshopsHeroPage() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",

        height: { xs: "70vh", md: "68vh" },
        overflow: "hidden",
        mb: { xs: 4, md: 6 },
      }}
    >
      <Box
        component="img"
        src="https://images.pexels.com/photos/20822079/pexels-photo-20822079.jpeg"
        alt="WorkShops hero"
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
            Ban Tao Village &gt; WorkShops
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              lineHeight: 1.1,
              textShadow: "0 6px 24px rgba(0,0,0,0.45)",
            }}
          >
            Discover Our WorkShops
          </Typography>

          <Typography variant="h6" sx={{ opacity: 0.95 }}>
            Hands-on care to release tension, restore balance, and soften the
            body–mind.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" size="large">
              Book a Session
            </Button>

            <Button variant="outlined" size="large" color="inherit">
              Contact Us
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default WorkshopsHeroPage;
