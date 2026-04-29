import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        bgcolor: "primary.dark",
        color: "background.default",
        mt: 8,

        overflow: "hidden",
      }}
    >
      {/* CTA SECTION */}
      <Container maxWidth="lg">
        <Box
          sx={{
            py: { xs: 5, md: 7 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 500,
              maxWidth: 520,
              lineHeight: 1.15,
            }}
          >
            Let’s find harmony together.
          </Typography>

          <Button
            variant="outlined"
            sx={{
              minWidth: { xs: "100%", md: 360 },
              py: 1.8,
              color: "background.default",
              borderColor: "background.default",
              borderRadius: 0,
              textTransform: "none",
              fontWeight: 700,
              "&:hover": {
                borderColor: "background.default",
                bgcolor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Container>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.16)" }} />

      {/* MAIN FOOTER */}
      <Container maxWidth="lg">
        <Box
          sx={{
            py: { xs: 5, md: 7 },
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1.6fr 1fr 1fr 1fr",
            },
            gap: 4,
          }}
        >
          {/* BRAND */}
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                letterSpacing: 2,
                mb: 2,
              }}
            >
              BAN TAO
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.75, maxWidth: 280 }}>
              A peaceful resort experience designed for rest, movement,
              treatments, workshops, and mindful retreats.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 3,
                fontWeight: 700,
              }}
            >
              Open daily · Koh Phangan, Thailand
            </Typography>
          </Box>

          {/* COLUMN 1 */}
          <FooterColumn
            title="Explore"
            links={["Rooms", "Treatments", "Workshops", "Retreats"]}
          />

          {/* COLUMN 2 */}
          <FooterColumn
            title="Quick Links"
            links={["About", "Reservations", "Events", "Contact"]}
          />

          {/* COLUMN 3 */}
          <FooterColumn
            title="Stay In Touch"
            links={["Facebook", "Instagram", "YouTube", "Spotify"]}
          />
        </Box>

        {/* BOTTOM BAR */}
        <Box
          sx={{
            py: 3,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            color: "text.disabled",
          }}
        >
          <Typography variant="caption">
            Copyright © 2026 Ban Tao Village. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={3}>
            <Typography variant="caption">Privacy</Typography>
            <Typography variant="caption">Terms</Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

function FooterColumn({ title, links }) {
  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          mb: 2,
          color: "background.default",
        }}
      >
        {title}
      </Typography>

      <Stack spacing={1}>
        {links.map((link) => (
          <Typography
            key={link}
            variant="body2"
            sx={{
              opacity: 0.75,
              cursor: "pointer",
              "&:hover": {
                opacity: 1,
                textDecoration: "underline",
              },
            }}
          >
            {link}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}

export default Footer;
