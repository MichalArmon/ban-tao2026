// src/pages/rooms/Room.jsx
import { useMemo, useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";

import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Chip,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import { Hotel, SquareFoot, People } from "@mui/icons-material";
import { useRoom } from "../../providers/RoomProvider";

const FALLBACK_IMG =
  "https://images.pexels.com/photos/7598360/pexels-photo-7598360.jpeg";

export default function FullPageCard() {
  const [mainImage, setMainImage] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [currentGallery, setCurrentGallery] = useState([]);
  const { handleGetRoomBySlug, room } = useRoom();
  const { slug } = useParams();
  console.log("params slug =", slug);

  useEffect(() => {
    if (slug) {
      console.log("slug:", slug);
      handleGetRoomBySlug(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (room) {
      console.log("room:", room);
      setMainImage(FALLBACK_IMG);
      setImgLoaded(true);
      const newGallery = room.gallery?.map((image) => image.url) || [];
      setCurrentGallery(newGallery);
      console.log(newGallery);
    }
  }, [room]);

  if (!room) {
    return (
      <Box height="1200px" bgcolor="red">
        sdvfsff
      </Box>
    );
  }

  const facilities = [
    {
      label: `${room.maxGuests ?? 2} guests`,
      icon: <People sx={{ fontSize: 16 }} />,
    },
    {
      label: `${room.sizeM2 ?? 30} m²`,
      icon: <SquareFoot sx={{ fontSize: 16 }} />,
    },
    {
      label: room.bedType ?? "King size",
      icon: <Hotel sx={{ fontSize: 16 }} />,
    },
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{ pt: { xs: 2, md: 4 }, pb: { xs: 4, md: 8 }, mt: 7 }}
    >
      {/* ===== Hero + Gallery =====
          מובייל: טור (hero למעלה, גלריה מתחת, גלילה אופקית)
          דסקטופ: שורה (hero משמאל, גלריה צידית מימין)
      */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ width: "100%" }}
      >
        {/* Hero */}
        <Paper
          elevation={0}
          sx={{
            flex: { md: "0 0 80%" },
            width: "100%",
            borderRadius: { xs: 2, md: 2 },
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {mainImage && (
            <Box
              component="img"
              src={mainImage}
              alt={room.title}
              onError={() => setMainImage(FALLBACK_IMG)}
              sx={{
                width: "100%",
                // במובייל יחס 16:9; בדסקטופ גובה קבוע
                height: { xs: "56vw", sm: "50vw", md: 520 },
                maxHeight: { xs: 420, md: 520 },
                objectFit: "cover",
                opacity: imgLoaded ? 1 : 0,
                transition: "opacity 0.3s ease",
                display: "block",
              }}
            />
          )}
        </Paper>

        {/* Gallery */}
        <Box
          sx={{
            // מובייל: גלילה אופקית מתחת ל-Hero
            display: { xs: "flex", md: "block" },
            flexDirection: "row",
            gap: 1.2,
            overflowX: { xs: "auto", md: "visible" },
            overflowY: { xs: "hidden", md: "auto" },
            p: { xs: 0.5, md: 0 },
            flex: { md: "0 0 20%" },
            maxHeight: { md: 520 },
            borderRadius: 2,
            pr: { md: 0.5 },
            "&::-webkit-scrollbar": { height: 6, width: 6 },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "divider",
              borderRadius: 8,
            },
          }}
        >
          {currentGallery.map((full, idx) => {
            const isActive = full === mainImage;
            return (
              <Box
                key={full + idx}
                component="img"
                src={full}
                alt=""
                // onClick={() => handleImageChange(full)}
                onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                sx={{
                  cursor: "pointer",
                  borderRadius: 1.2,
                  border: "2px solid",
                  borderColor: isActive ? "primary.light" : "transparent",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                  "&:hover": { transform: "scale(1.03)" },
                  // מובייל: תמונות קטנות לרוחב; דסקטופ: אריחים אנכיים
                  width: { xs: 120, sm: 140, md: "100%" },
                  height: { xs: 80, sm: 100, md: "auto" },
                  objectFit: "cover",
                  flex: { xs: "0 0 auto", md: "unset" },
                  mb: { md: 1.2 },
                }}
              />
            );
          })}
        </Box>
      </Stack>

      <Divider sx={{ my: { xs: 3, md: 4 } }} />

      {/* ===== Content blocks ===== */}
      <Grid container spacing={4}>
        {/* במובייל Quick Facts קודם, על אזור רחב (full-bleed) */}
        <Grid item xs={12} md={5} order={{ xs: 1, md: 2 }}>
          <Box
            sx={{
              mx: { xs: -2, md: 0 }, // שוליים שליליים לביטול padding של ה-Container במובייל
              px: { xs: 2, md: 0 }, // מחזירים padding פנימי נוח
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 3 },
                border: "1px solid",
                borderColor: "divider",
                borderRadius: { xs: 0, md: 2 }, // במובייל קצה-לקצה
                bgcolor: "background.paper",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: "text.secondary" }}
              >
                Room Quick Facts
              </Typography>

              <Grid container spacing={1.5}>
                {facilities.map((f, i) => (
                  <Grid key={i} item xs={6} md={12}>
                    <Stack direction="row" alignItems="center" spacing={1.2}>
                      <Box color="primary.main">{f.icon}</Box>
                      <Typography variant="body1">{f.label}</Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        </Grid>

        <Grid item xs={12} md={7} order={{ xs: 2, md: 1 }}>
          <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
            Room Description
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, whiteSpace: "pre-line" }}>
            {room.blurb}
          </Typography>

          <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
            Room Amenities
          </Typography>
          {!!room.features?.length && (
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
              sx={{ mb: 3 }}
            >
              {room.features.map((f) => (
                <Chip key={f} label={f} variant="outlined" size="medium" />
              ))}
            </Stack>
          )}
        </Grid>
      </Grid>

      <Divider sx={{ mt: 4, mb: 1, display: { xs: "block", md: "none" } }} />
    </Container>
  );
}
