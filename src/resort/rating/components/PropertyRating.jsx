import {
  Typography,
  Grid,
  Box,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Button,
  Divider,
  Rating, // <-- הוספתי את הייבוא החסר כאן!
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ScoreBadge = ({ score, text }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <Box
      sx={{
        backgroundColor: "#003580",
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        fontWeight: "bold",
        fontSize: "1.1rem",
      }}
    >
      {score}
    </Box>
    <Typography
      variant="subtitle2"
      sx={{ color: "#003580", fontWeight: "bold" }}
    >
      {text}
    </Typography>
  </Box>
);

const fake = {
  location: "350 m from center",
  rating: 4.5,
  reviewsCount: 102,
};

function PropertyRating() {
  return (
    <>
      <Box>
        <Rating
          value={fake.rating}
          precision={0.5}
          readOnly
          size="small"
          sx={{ mb: 1 }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
            gap: 0.5,
            mb: 2,
          }}
        >
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2">{fake.location}</Typography>
        </Box>
      </Box>
      {/* Score and Reviews */}
      <Box sx={{ textAlign: "right" }}>
        <ScoreBadge score={fake.rating.toFixed(1)} text="Excellent" />
        <Typography variant="caption" color="text.secondary">
          {fake.reviewsCount} reviews
        </Typography>
      </Box>
    </>
  );
}

// אל תשכחי לייצא את השם החדש
export default PropertyRating;
