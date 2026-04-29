import { useEffect, useState } from "react";
import { Button, Typography, Box, keyframes, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

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

  const wipeIn = keyframes`
    from { background-size: 0% 100%; }
    to   { background-size: 200% 100%; }
  `;

  return (
    <Box
      className="hero"
      aria-busy={showLoader ? "true" : "false"}
      sx={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: { xs: "30px", md: "40px" },
        overflow: "hidden",

        color: "white",
      }}
    >
      {/* תמונת רקע */}
      <Box
        component="img"
        src="/HERO.jpg"
        alt="Ban Tao"
        onLoad={() => setImgLoaded(true)}
        decoding="async"
        fetchpriority="high"
        sizes="100vw"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.7)",
        }}
      />

      {/* מסך טעינה */}
      <Box
        aria-hidden={!showLoader}
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: (t) => t.zIndex.modal + 1,
          bgcolor: "background.default",
          display: "grid",
          placeItems: "center",
          opacity: showLoader ? 1 : 0,
          pointerEvents: showLoader ? "auto" : "none",
          transition: "opacity 600ms ease",
        }}
      >
        <Box
          component="video"
          src="/resortweb.webm"
          autoPlay
          muted
          playsInline
          sx={{
            width: { xs: 360, sm: 320, md: 680 },
            height: "auto",
            opacity: fadeVideo ? 0 : 1,
            transition: `opacity ${VIDEO_FADE_MS}ms ease`,
            "@media (prefers-reduced-motion: reduce)": {
              transition: "none",
            },
          }}
        />
      </Box>

      {/* תוכן מרכזי */}
      <Box
        sx={{
          zIndex: 2,
          maxWidth: "900px",
          px: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* כותרת עליונה */}
        <Typography
          sx={{
            textTransform: "uppercase",
            letterSpacing: 2,
            fontSize: { xs: "0.8rem", md: "1rem" },
            opacity: 0.8,
            mb: 1,
          }}
        >
          Discover Our World
        </Typography>

        {/* כותרת ראשית */}
        <Typography
          variant="h1"
          sx={{
            fontWeight: 600,
            fontSize: { xs: "2.2rem", md: "6rem" },
            mb: 2,
          }}
        >
          BAN TAO VILLAGE
        </Typography>

        {/* טקסט משנה */}
        <Typography
          sx={{
            fontSize: { xs: "1rem", md: "1.2rem" },
            mb: 4,
            maxWidth: "600px",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          A sanctuary for the senses — where nature, design, and wellness blend
          in harmony.
        </Typography>

        {/* שני כפתורים זה לצד זה */}
        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            component={RouterLink}
            to="/resort/guest"
            variant="contained"
            size="large"
            sx={{
              bgcolor: "primary.main",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1, // רווח בין הטקסט לאייקון
              px: 4,
              py: 1.4,
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            TO OUR WEBSITE
            <ArrowForwardIosRoundedIcon
              sx={{
                fontSize: 18,
                ml: 0.5,
                color: "inherit", // ✅ אותו צבע כמו הטקסט
                opacity: 0.9,
                transition: "transform 0.3s ease",
                transform: "translateX(0)",
                "&:hover": { transform: "translateX(4px)" }, // תנועה בהובר 🎯
              }}
            />
          </Button>

          <Button
            component={RouterLink}
            to="/contact"
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.4,
              color: "primary.contrastText", // או פשוט "white"
              borderColor: "rgba(255,255,255,0.4)",
              backgroundColor: "rgba(255,255,255,0.08)", // 🌫️ רקע עדין שקוף
              backdropFilter: "blur(4px) saturate(120%)", // ✨ אפקט עדין של זכוכית
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.18)", // טיפה יותר מודגש בהובר
              },
            }}
          >
            CONTACT US
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
