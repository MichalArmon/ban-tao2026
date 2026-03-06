import { Hotel, People, SquareFoot } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Chip,
  Paper,
} from "@mui/material";

function RoomListSection({
  imgSrc,
  imgTitle,
  title,
  blurb,
  category,
  priceLabel,
  reverse = false,
  maxGuests,
  sizeM2,
  bedType,
}) {
  const facilities = [
    {
      label: `${maxGuests ?? 2} guests`,
      icon: <People sx={{ fontSize: 16 }} />,
    },
    {
      label: `${sizeM2 ?? 30} m²`,
      icon: <SquareFoot sx={{ fontSize: 16 }} />,
    },
    {
      label: bedType ?? "King size",
      icon: <Hotel sx={{ fontSize: 16 }} />,
    },
  ];
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Grid
        container
        spacing={4}
        direction={reverse ? "row-reverse" : "row"}
        alignItems="center"
        sx={{
          flexWrap: "nowrap",
          "@media (max-width:900px)": { flexWrap: "wrap" },
        }}
      >
        {/* IMAGE */}
        <Grid
          item
          size={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={imgSrc}
            alt={imgTitle}
            loading="lazy"
            sx={{
              width: "100%",
              height: 400,
              objectFit: "cover",
              borderRadius: 3,
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            }}
          />
        </Grid>

        {/* TEXT */}
        <Grid size={6}>
          <Typography
            variant="h4"
            sx={{ mb: 2.4, fontWeight: 400 }}
            textAlign="start"
          >
            {title}
          </Typography>

          {/* כאן התיקון: הפכנו את זה ל-container כדי שה-md=6 של הילדים יעבוד */}
          <Grid container spacing={4} alignItems="stretch">
            {/* חצי שמאלי: תיאור החדר */}
            <Grid item xs={12} size={6}>
              <Typography
                variant="h6"
                textAlign="start"
                sx={{ mb: 1, fontWeight: 600 }}
              >
                Room Description
              </Typography>
              {blurb && (
                <Typography variant="body1" textAlign="start">
                  {blurb}
                </Typography>
              )}
              <Typography
                variant="h6"
                textAlign="start"
                sx={{ mb: 1, fontWeight: 600 }}
              >
                Room Amenities
              </Typography>
              {blurb && (
                <Typography variant="body1" textAlign="start">
                  {blurb}
                </Typography>
              )}
            </Grid>

            {/* חצי ימני: עובדות מהירות */}
            <Grid item xs={12} size={6}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, md: 3 },
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: { xs: 0, md: 2 },
                  bgcolor: "background.paper",
                }}
              >
                <Typography
                  variant="h6"
                  textAlign="start"
                  sx={{ fontWeight: 600, mb: 1, color: "text.secondary" }}
                >
                  Room Quick Facts
                </Typography>

                <Grid
                  container
                  alignItems="center"
                  justifyContent="flex-start" // מיישר את האייקונים יפה לשמאל בתוך הקופסה
                  spacing={1.5}
                >
                  {facilities.map((f, i) => (
                    // שינינו ל-xs=12 כדי שכל פיצ'ר יקבל שורה משלו בתוך הקופסה הקטנה
                    <Grid key={i} item xs={12}>
                      <Stack direction="row" alignItems="center" spacing={1.2}>
                        <Box color="primary.main">{f.icon}</Box>
                        <Typography variant="body1">{f.label}</Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RoomListSection;
