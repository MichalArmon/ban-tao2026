import MyTextField from "../../../../Form/MyTextField";

import {
  Grid,
  Button,
  Box,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";

import roomSchema from "../../models/roomSchema";
import useForm from "../../../hooks/useForm";
import useCloudinaryUpload from "../../../hooks/useCloudinaryUpload";
import { useRoom } from "../../../providers/RoomProvider";
import useRoomUploadImages from "../../../hooks/rooms/useRoomUploadImages";
import { Close } from "@mui/icons-material";

function RoomForm({ handleSubmitForm, initialRoomValues }) {
  const { room } = useRoom();
  const { handleChange, handleSubmit, errors, formDetails, setFormDetails } =
    useForm(initialRoomValues, roomSchema, handleSubmitForm);
  const { isUploading } = useCloudinaryUpload();
  const {
    handleUploadHeroImage,
    handleUploadGalleryImage,
    handleDeleteImageFromGallery,
  } = useRoomUploadImages(setFormDetails);

  return (
    <>
      <Grid container maxWidth="sm" spacing={1} sx={{ bgcolor: "#fff", p: 2 }}>
        <Grid container size={12} sx={{ display: "flex" }}>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="title"
              name="title"
              onChange={handleChange}
              error={Boolean(errors.title)}
              helperText={errors.title}
              value={formDetails.title || ""}
              required
            />
          </Grid>

          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="slug"
              name="slug"
              onChange={handleChange}
              error={Boolean(errors.slug)}
              helperText={errors.slug}
              value={formDetails.slug}
              required
            />
          </Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={{ md: 12, xs: 12 }}>
            <MyTextField
              label="blurb"
              name="blurb"
              onChange={handleChange}
              error={Boolean(errors.blurb)}
              helperText={errors.blurb}
              value={formDetails.blurb}
              required
            />
          </Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="features"
              name="features"
              onChange={handleChange}
              error={Boolean(errors.features)}
              value={formDetails.features}
              helperText={errors.features}
              required
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="maxGuests"
              name="maxGuests"
              onChange={handleChange}
              value={formDetails.maxGuests}
              required
              type="number"
              error={Boolean(errors.maxGuests)}
              helperText={errors.maxGuests}
              // sx={{ "& .MuiOutlinedInput-root": { borderRadius: 5 } }}
            />
          </Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="sizeM2"
              onChange={handleChange}
              name="sizeM2"
              error={Boolean(errors.sizeM2)}
              helperText={errors.sizeM2}
              value={formDetails.sizeM2}
              type="number"
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="bedType"
              name="bedType"
              onChange={handleChange}
              error={Boolean(errors.bedType)}
              helperText={errors.bedType}
              value={formDetails.bedType}
            />
          </Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="priceBase"
              onChange={handleChange}
              name="priceBase"
              error={Boolean(errors.priceBase)}
              helperText={errors.priceBase}
              value={formDetails.priceBase}
              type="number"
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="currency"
              name="currency"
              onChange={handleChange}
              error={Boolean(errors.currency)}
              helperText={errors.currency}
              value={formDetails.currency}
            />
          </Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="stock"
              onChange={handleChange}
              name="stock"
              error={Boolean(errors.stock)}
              helperText={errors.stock}
              value={formDetails.stock}
              type="number"
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <FormControlLabel
              control={
                <Switch checked={formDetails.active} onChange={handleChange} />
              }
              label="Active"
              name="active"
            />
          </Grid>
        </Grid>

        {/* ✔️✔️✔️ HERO ✔️✔️✔️ */}
        <Grid
          container
          size={12}
          sx={{ mt: 2, p: 2, border: "1px dashed grey" }}
        >
          <Typography variant="h6" sx={{ width: "100%", mb: 1 }}>
            Hero image
          </Typography>

          <Button variant="contained" component="label" disabled={isUploading}>
            {isUploading ? "Image is Uploading..." : "Add new hero image"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(event) => {
                handleUploadHeroImage(event, formDetails.slug);
              }}
            />
          </Button>

          {/* תצוגה מקדימה של התמונות שכבר עלו למערך */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 2,
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {formDetails.heroUrl && (
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  overflow: "hidden",
                  borderRadius: 2,
                }}
              >
                <img
                  src={formDetails.heroUrl}
                  alt={formDetails.heroAlt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}
          </Box>
        </Grid>
        {/* ✔️✔️✔️GALLERY✔️✔️✔️ */}
        <Grid
          container
          size={12}
          sx={{ mt: 2, p: 2, border: "1px dashed grey" }}
        >
          <Typography variant="h6" sx={{ width: "100%", mb: 1 }}>
            Gallery
          </Typography>

          <Button variant="contained" component="label" disabled={isUploading}>
            {isUploading ? "Image is Uploading..." : "Add new image"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(event) => {
                handleUploadGalleryImage(event, formDetails.slug);
              }}
            />
          </Button>

          {/* תצוגה מקדימה של התמונות שכבר עלו למערך */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 2,
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {formDetails.images &&
              formDetails.images.map((img, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 100,
                    height: 100,
                    overflow: "hidden",
                    borderRadius: 2,
                    position: "relative",
                  }}
                >
                  <Button
                    sx={{ position: "absolute", left: 0 }}
                    onClick={() => {
                      handleDeleteImageFromGallery(index);
                    }}
                  >
                    <Close sx={{ color: "black" }} />
                  </Button>
                  <img
                    src={img.url}
                    alt={img.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
          </Box>
        </Grid>
        <Box>
          <Button
            sx={{
              px: 2,
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
                boxShadow: "0px 10px 20px rgba(0,0,0,0.4)",
                transform: "scale(1.02)",
                borderWidth: 0,
                fontWeight: 700,
              },
            }}
            variant="outlined"
            color="white"
            size="large"
            onClick={handleSubmit}
            fullWidth
          >
            {!room ? " Create new room" : "Edit room"}
          </Button>
        </Box>
      </Grid>
    </>
  );
}

export default RoomForm;
