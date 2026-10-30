import { Box, Container, Typography } from "@mui/material";
import { motion } from "motion/react";

function IntroBlock() {
  return (
    <Box
      sx={{
        width: "100vw",
        maxWidth: "100vw",
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
        bgcolor: "background.default",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 6, md: 10 },
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          sx={{
            maxWidth: 820,
            mx: "auto",
          }}
        >
          <Typography
            component="h2"
            sx={{
              textTransform: "uppercase",
              letterSpacing: ".12em",
              fontWeight: 600,
              fontSize: { xs: 14, md: 16 },
              color: "text.primary",
              mb: 2,
            }}
          >
            WELCOME TO BAN TAO LIVING IN KOH PHANGAN
          </Typography>

          <Typography
            component="p"
            sx={{
              color: "text.secondary",
              lineHeight: 1.9,
              fontSize: { xs: 15, md: 17 },
              maxWidth: 760,
              mb: 3,
            }}
          >
            BAN TAO presents 10 artistic-minimalist villas in Koh Phangan, each
            with a private pool and stunning living spaces, where timeless
            living meets the tropics. Choosing BAN TAO Phangan means embracing a
            lifestyle that rises above the ordinary. Here, we celebrate the
            exceptional and redefine what it means to live in Koh Phangan.
          </Typography>

          <Typography
            component="p"
            sx={{
              color: "text.secondary",
              lineHeight: 1.9,
              fontSize: { xs: 15, md: 17 },
              maxWidth: 760,
            }}
          >
            Discover a sanctuary where contemporary architecture blends
            seamlessly with the island's natural beauty. Every space is
            thoughtfully designed to invite tranquility, connection, and
            unforgettable moments.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default IntroBlock;
