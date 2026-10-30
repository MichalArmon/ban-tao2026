import { Box, Container, Stack, Typography, Button } from "@mui/material";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const COLORS = {
  cream: "#F7F5EF",
  green: "#34483D",
  brown: "#766354",
  brownDark: "#554539",
  sand: "#A28B72",
};

function WorkshopsHeroPage() {
  const scrollToWorkshops = () => {
    document.getElementById("workshops-list")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "75svh", md: "76svh" },
        minHeight: { xs: 520, md: 580 },
        overflow: "hidden",
        mb: { xs: 4, md: 6 },
        bgcolor: COLORS.green,
      }}
    >
      {/* BACKGROUND IMAGE */}
      <Box
        component={motion.img}
        src="https://images.pexels.com/photos/20822079/pexels-photo-20822079.jpeg"
        alt="Workshops and experiences at Ban Tao Village"
        initial={{ scale: 1.07 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2.2,
          ease: "easeOut",
        }}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          filter: "contrast(1.02) saturate(0.94)",
        }}
      />

      {/* CINEMATIC OVERLAY */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(
              90deg,
              rgba(20, 35, 29, 0.65) 0%,
              rgba(20, 35, 29, 0.34) 48%,
              rgba(20, 35, 29, 0.08) 100%
            ),
            linear-gradient(
              0deg,
              rgba(16, 27, 23, 0.30) 0%,
              transparent 55%
            )
          `,
        }}
      />

      {/* CONTENT */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack
          spacing={0}
          sx={{
            color: COLORS.cream,
            maxWidth: { xs: "100%", md: 730 },
            pt: { xs: 3, md: 0 },
          }}
        >
          {/* EYEBROW */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.8,
              ease: "easeOut",
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 28,
                height: 1,
                bgcolor: COLORS.sand,
              }}
            />

            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.22em",
                color: COLORS.cream,
              }}
            >
              BAN TAO VILLAGE / WORKSHOPS
            </Typography>
          </Box>

          {/* MAIN TITLE */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.9,
              ease: "easeOut",
            }}
          >
            <Typography
              component="h1"
              sx={{
                fontFamily: "Georgia, serif",
                fontSize: {
                  xs: "clamp(42px, 10vw, 58px)",
                  md: "clamp(64px, 6vw, 92px)",
                },
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                color: "#FFFFFF",
                textShadow: "0 5px 28px rgba(0,0,0,0.14)",
                mb: 3,
              }}
            >
              Move. Create.
              <Box component="span" sx={{ display: "block" }}>
                Connect.
              </Box>
            </Typography>
          </Box>

          {/* DESCRIPTION */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.45,
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            <Typography
              sx={{
                maxWidth: 480,
                fontSize: { xs: 14, md: 16 },
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.88)",
                fontWeight: 400,
                mb: 4,
              }}
            >
              Meaningful experiences inspired by movement, creativity, nature,
              and the spirit of island living.
            </Typography>
          </Box>

          {/* ACTIONS */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.65,
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              alignItems={{ xs: "stretch", sm: "center" }}
            >
              {/* WORKSHOPS BUTTON */}
              <Button
                variant="contained"
                onClick={scrollToWorkshops}
                endIcon={<KeyboardArrowDownRoundedIcon />}
                sx={{
                  bgcolor: COLORS.brown,
                  color: "#FFFFFF",
                  borderRadius: 0,
                  px: 4,
                  py: 1.8,
                  minHeight: 54,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  boxShadow: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: COLORS.brownDark,
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 22px rgba(0,0,0,0.16)",
                  },
                }}
              >
                VIEW WORKSHOPS
              </Button>

              {/* CONTACT BUTTON */}
              <Button
                component={Link}
                to="/resort/contact"
                variant="outlined"
                endIcon={<ArrowOutwardRoundedIcon />}
                sx={{
                  borderColor: "rgba(255,255,255,0.65)",
                  color: "#FFFFFF",
                  borderRadius: 0,
                  px: 3.5,
                  py: 1.8,
                  minHeight: 54,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#FFFFFF",
                    bgcolor: "rgba(255,255,255,0.10)",
                  },
                }}
              >
                CONTACT US
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>

      {/* BOTTOM DETAIL */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 22, md: 35 },
          right: { xs: 24, md: 60 },
          zIndex: 1,
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          gap: 1.5,
          color: "rgba(255,255,255,0.78)",
        }}
      >
        <Box
          sx={{
            width: 30,
            height: 1,
            bgcolor: COLORS.sand,
          }}
        />

        <Typography
          sx={{
            fontSize: 10,
            letterSpacing: "0.18em",
            fontWeight: 500,
          }}
        >
          KOH PHANGAN · THAILAND
        </Typography>
      </Box>
    </Box>
  );
}

export default WorkshopsHeroPage;
