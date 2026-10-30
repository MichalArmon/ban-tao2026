import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";
import { motion } from "motion/react";

import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import InstagramIcon from "@mui/icons-material/Instagram";

const COLORS = {
  green: "#34483D",
  greenDark: "#27382F",
  cream: "#F7F5EF",
  sand: "#A28B72",
  muted: "#B8C2B8",
  border: "rgba(247,245,239,0.17)",
};

const navigationLinks = [
  { label: "Home", to: "/resort" },
  { label: "Rooms", to: "/resort/rooms" },
  { label: "Treatments", to: "/resort/treatments" },
  { label: "Workshops", to: "/resort/workshops" },
];

const informationLinks = [{ label: "Contact", to: "/resort/contact" }];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        bgcolor: COLORS.green,
        color: COLORS.cream,
        mt: 8,
        overflow: "hidden",
      }}
    >
      {/* TOP CALL TO ACTION */}
      <Container maxWidth="lg">
        <Box
          component={motion.div}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          sx={{
            py: { xs: 7, md: 10 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: { xs: 4, md: 6 },
          }}
        >
          <Box sx={{ maxWidth: 650 }}>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.24em",
                color: COLORS.sand,
                mb: 2.5,
              }}
            >
              YOUR ISLAND ESCAPE AWAITS
            </Typography>

            <Typography
              component="h2"
              sx={{
                fontFamily: "Georgia, serif",
                fontSize: {
                  xs: "clamp(34px, 8vw, 48px)",
                  md: "clamp(48px, 4.5vw, 65px)",
                },
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                color: COLORS.cream,
              }}
            >
              A little closer
              <Box component="span" sx={{ display: "block" }}>
                to paradise.
              </Box>
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 13, md: 15 },
                lineHeight: 1.9,
                color: COLORS.muted,
                mt: 2.5,
                maxWidth: 440,
              }}
            >
              Whether you're planning your stay or simply have a question, we'd
              love to hear from you.
            </Typography>
          </Box>

          <Button
            component={RouterLink}
            to="/resort/contact"
            variant="outlined"
            endIcon={<ArrowOutwardRoundedIcon />}
            sx={{
              minWidth: { xs: "100%", sm: 220 },
              minHeight: 56,
              px: 4,
              py: 1.7,
              borderRadius: 0,
              borderColor: "rgba(247,245,239,0.68)",
              color: COLORS.cream,
              bgcolor: "transparent",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.13em",
              whiteSpace: "nowrap",
              transition: "all 0.3s ease",

              "&:hover": {
                borderColor: COLORS.cream,
                bgcolor: "rgba(247,245,239,0.08)",
                transform: "translateY(-3px)",
              },

              "& .MuiButton-endIcon": {
                transition: "transform 0.3s ease",
              },

              "&:hover .MuiButton-endIcon": {
                transform: "translate(3px, -3px)",
              },
            }}
          >
            GET IN TOUCH
          </Button>
        </Box>
      </Container>

      <Divider sx={{ borderColor: COLORS.border }} />

      {/* MAIN FOOTER */}
      <Container maxWidth="lg">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          sx={{
            py: { xs: 6, md: 8 },
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              md: "2fr 1fr 1fr 1fr",
            },
            columnGap: { xs: 3, md: 5 },
            rowGap: { xs: 5, md: 4 },
          }}
        >
          {/* BRAND */}
          <Box sx={{ gridColumn: { xs: "1 / -1", md: "auto" } }}>
            <Box
              component={RouterLink}
              to="/resort"
              aria-label="Ban Tao Village Home"
              sx={{
                display: "inline-block",
                textDecoration: "none",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Georgia, serif",
                  fontSize: 32,
                  fontWeight: 400,
                  letterSpacing: "0.12em",
                  color: COLORS.cream,
                }}
              >
                BAN TAO
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: 13,
                lineHeight: 1.9,
                color: COLORS.muted,
                maxWidth: 270,
              }}
            >
              An intimate island sanctuary where thoughtful design, nature, and
              well-being come together.
            </Typography>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{ mt: 3 }}
            >
              <Box
                sx={{
                  width: 22,
                  height: 1,
                  bgcolor: COLORS.sand,
                }}
              />

              <Typography
                sx={{
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  color: COLORS.cream,
                }}
              >
                KOH PHANGAN · THAILAND
              </Typography>
            </Stack>
          </Box>

          {/* NAVIGATION */}
          <FooterColumn title="THE VILLAGE" links={navigationLinks} />

          {/* INFORMATION */}
          <FooterColumn title="INFORMATION" links={informationLinks} />

          {/* SOCIAL */}
          <Box>
            <FooterHeading>STAY CONNECTED</FooterHeading>

            <Typography
              sx={{
                fontSize: 13,
                lineHeight: 1.9,
                color: COLORS.muted,
                mb: 2,
              }}
            >
              Follow the rhythm of island life.
            </Typography>

            {/* Social icons can be linked when
                the official profiles are available. */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <InstagramIcon
                sx={{
                  fontSize: 20,
                  color: COLORS.cream,
                  opacity: 0.75,
                }}
              />

              <Typography
                sx={{
                  fontSize: 12,
                  color: COLORS.muted,
                }}
              >
                Instagram
              </Typography>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ borderColor: COLORS.border }} />

        {/* BOTTOM BAR */}
        <Box
          sx={{
            py: { xs: 3, md: 3.5 },
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              color: COLORS.muted,
              letterSpacing: "0.025em",
            }}
          >
            © 2026 Ban Tao Village. All rights reserved.
          </Typography>

          <Typography
            sx={{
              fontSize: 10,
              letterSpacing: "0.16em",
              color: COLORS.sand,
            }}
          >
            DESIGNED WITH INTENTION
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

function FooterHeading({ children }) {
  return (
    <Typography
      sx={{
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.18em",
        color: COLORS.cream,
        mb: 2.5,
      }}
    >
      {children}
    </Typography>
  );
}

function FooterColumn({ title, links }) {
  return (
    <Box>
      <FooterHeading>{title}</FooterHeading>

      <Stack spacing={1.5}>
        {links.map((link) => (
          <Typography
            key={link.to}
            component={RouterLink}
            to={link.to}
            sx={{
              display: "block",
              width: "fit-content",
              fontSize: 13,
              fontWeight: 400,
              lineHeight: 1.7,
              color: COLORS.muted,
              textDecoration: "none",
              transition: "color 0.25s ease",

              "&:hover": {
                color: COLORS.cream,
              },
            }}
          >
            {link.label}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}

export default Footer;
