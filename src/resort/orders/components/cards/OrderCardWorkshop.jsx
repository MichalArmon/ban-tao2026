import {
  Typography,
  Grid,
  Box,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Stack,
  Button,
  Divider,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dayjs from "dayjs";
function OrderCardWorkshop({ service, date }) {
  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column" },
          mb: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%" },
            height: { xs: 200, sm: 200 },
            objectFit: "cover",
          }}
          image={service.hero.url}
          alt={service.title}
        />

        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", mb: 4 }}
            >
              {service.title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
            ></Stack>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, mb: 3 }}
            >
              {service.blurb}
            </Typography>
          </Box>

          {/* 3. Action Section (Bottom Right) */}

          <Box sx={{ display: "flex", mb: 2 }}>
            <CalendarTodayIcon sx={{ mr: 1, color: "#8d6e63" }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Date
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {dayjs(date).format("dddd, MM/DD/YYYY")}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex" }}>
            <AccessTimeIcon sx={{ mr: 1, color: "#8d6e63" }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Time
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {dayjs(date).format("hh:mm A")}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column" },
          mb: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Your price summary
          </Typography>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                Total
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {service.price}
                {service.currency}
              </Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Includes taxes and charges
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In the property's local currency: € 251
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default OrderCardWorkshop;
