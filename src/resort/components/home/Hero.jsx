import { useEffect, useState } from "react";
import { Button, Typography, Box, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "motion/react";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

const COLORS = {
  sand: "#A28B72",
  brown: "#766354",
  brownDark: "#554539",
  white: "#FFFFFF",
};

export default function Hero() {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [fadeVideo, setFadeVideo] = useState(false);

  const START_FADE_AFTER_MS = 3800;
  const VIDEO_FADE_MS = 450;
  const WHITE_LAG_AFTER_VIDEO_MS = 60;

  useEffect(() => {
    const fallback = setTimeout(() => setShowLoader(false), 5000);
    return () => clearTimeout(fallback);
  }, []);

  useEffect(() => {
    if (!imgLoaded) return;

    const t1 = setTimeout(() => setFadeVideo(true), START_FADE_AFTER_MS);

    const t2 = setTimeout(
      () => setShowLoader(false),
      START_FADE_AFTER_MS + VIDEO_FADE_MS + WHITE_LAG_AFTER_VIDEO_MS,
    );

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [imgLoaded]);

  const scrollToAvailability = () => {
    document.getElementById("availability")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Box
      component="section"
      aria-busy={showLoader}
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        textAlign: "center",
        color: COLORS.white,
        isolation: "isolate",
      }}
    >
      {/* BACKGROUND IMAGE */}
      <Box
        component="img"
        src="/HERO.jpg"
        alt=""
        onLoad={() => setImgLoaded(true)}
        decoding="async"
        fetchPriority="high"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: -2,
        }}
      />

      {/* SOFT OVERLAY */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          background:
            "linear-gradient(180deg, rgba(15,28,23,0.28) 0%, rgba(15,28,23,0.40) 55%, rgba(15,28,23,0.32) 100%)",
        }}
      />

      {/* INTRO LOADER */}
      <Box
        aria-hidden={!showLoader}
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: (theme) => theme.zIndex.modal + 1,
          bgcolor: "background.default",
          display: "grid",
          placeItems: "center",
          opacity: showLoader ? 1 : 0,
          pointerEvents: showLoader ? "auto" : "none",
          visibility: showLoader ? "visible" : "hidden",
          transition: "opacity 600ms ease, visibility 600ms ease",
        }}
      >
        <Box
          component="video"
          src="/resortweb.webm"
          autoPlay
          muted
          playsInline
          sx={{
            width: { xs: "85vw", sm: 420, md: 680 },
            maxWidth: "100%",
            height: "auto",
            opacity: fadeVideo ? 0 : 1,
            transition: `opacity ${VIDEO_FADE_MS}ms ease`,
            "@media (prefers-reduced-motion: reduce)": {
              transition: "none",
            },
          }}
        />
      </Box>

      {/* MAIN CONTENT */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 1100,
          px: { xs: 3, md: 5 },
          py: { xs: 12, md: 15 },
          mx: "auto",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* EYEBROW */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          animate={{
            opacity: showLoader ? 0 : 1,
            y: showLoader ? 16 : 0,
          }}
          transition={{
            duration: 0.75,
            ease: "easeOut",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 11, md: 12 },
              letterSpacing: "0.28em",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.88)",
              mb: 2,
            }}
          >
            WELCOME TO OUR WORLD
          </Typography>
        </Box>

        {/* DECORATIVE LINE */}
        <Box
          component={motion.div}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: showLoader ? 0 : 1 }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          sx={{
            width: 52,
            height: 2,
            bgcolor: COLORS.sand,
            transformOrigin: "center",
            mb: 3,
          }}
        />

        {/* MAIN TITLE */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 28 }}
          animate={{
            opacity: showLoader ? 0 : 1,
            y: showLoader ? 28 : 0,
          }}
          transition={{
            duration: 0.95,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontFamily: "Georgia, serif",
              fontWeight: 400,
              fontSize: {
                xs: "clamp(2.7rem, 10vw, 4rem)",
                md: "clamp(4.5rem, 6.5vw, 6.6rem)",
              },
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              color: COLORS.white,
              mb: 3,
              textShadow: "0 4px 24px rgba(0,0,0,0.15)",
            }}
          >
            BAN TAO VILLAGE
          </Typography>
        </Box>

        {/* DESCRIPTION */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 18 }}
          animate={{
            opacity: showLoader ? 0 : 1,
            y: showLoader ? 18 : 0,
          }}
          transition={{
            duration: 0.85,
            delay: 0.3,
            ease: "easeOut",
          }}
          sx={{
            maxWidth: 580,
            mb: 5,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 15, md: 18 },
              lineHeight: 1.85,
              fontWeight: 400,
              color: "rgba(255,255,255,0.91)",
              letterSpacing: "0.01em",
            }}
          >
            A sanctuary for the senses — where nature, design, and wellness
            blend in harmony.
          </Typography>
        </Box>

        {/* ACTION BUTTONS */}
        <Stack
          component={motion.div}
          initial={{ opacity: 0, y: 18 }}
          animate={{
            opacity: showLoader ? 0 : 1,
            y: showLoader ? 18 : 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.45,
            ease: "easeOut",
          }}
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {/* AVAILABILITY */}
          <Button
            variant="contained"
            size="large"
            onClick={scrollToAvailability}
            endIcon={<KeyboardArrowDownRoundedIcon />}
            sx={{
              minWidth: { xs: "100%", sm: 240 },
              minHeight: 54,
              px: 4,

              borderRadius: 0,
              bgcolor: COLORS.brown,
              color: COLORS.white,

              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",

              boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
              transition: "all 0.3s ease",

              "&:hover": {
                bgcolor: COLORS.brownDark,
                transform: "translateY(-2px)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.22)",
              },

              "& .MuiButton-endIcon": {
                transition: "transform 0.3s ease",
              },

              "&:hover .MuiButton-endIcon": {
                transform: "translateY(4px)",
              },
            }}
          >
            CHECK AVAILABILITY
          </Button>

          {/* CONTACT */}
          <Button
            component={RouterLink}
            to="/resort/contact"
            variant="outlined"
            size="large"
            endIcon={<ArrowOutwardRoundedIcon />}
            sx={{
              minWidth: { xs: "100%", sm: 190 },
              minHeight: 54,
              px: 4,

              borderRadius: 0,
              color: COLORS.white,
              borderColor: "rgba(255,255,255,0.65)",
              bgcolor: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(6px)",

              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",

              transition: "all 0.3s ease",

              "&:hover": {
                borderColor: COLORS.white,
                bgcolor: "rgba(255,255,255,0.17)",
                transform: "translateY(-2px)",
              },

              "& .MuiButton-endIcon": {
                transition: "transform 0.3s ease",
              },

              "&:hover .MuiButton-endIcon": {
                transform: "translate(3px, -3px)",
              },
            }}
          >
            CONTACT US
          </Button>
        </Stack>

        {/* BOTTOM DETAIL */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: showLoader ? 0 : 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          sx={{
            mt: { xs: 8, md: 10 },
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 1,
              bgcolor: "rgba(255,255,255,0.55)",
            }}
          />

          <Typography
            sx={{
              fontSize: 10,
              letterSpacing: "0.24em",
              color: "rgba(255,255,255,0.82)",
            }}
          >
            KOH PHANGAN · THAILAND
          </Typography>

          <Box
            sx={{
              width: 30,
              height: 1,
              bgcolor: "rgba(255,255,255,0.55)",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
