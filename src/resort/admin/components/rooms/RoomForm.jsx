import MyTextField from "../../../../Form/MyTextField";

import {
  Grid,
  Button,
  Box,
  FormControlLabel,
  Switch,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import roomSchema from "../../models/roomSchema";
import useForm from "../../../hooks/useForm";
import useCloudinaryUpload from "../../../hooks/cloudinary/useCloudinaryUpload";
import { useRoom } from "../../../providers/RoomProvider";
import useRoomUploadImages from "../../../hooks/cloudinary/useUploadImages";
import { Close } from "@mui/icons-material";
import BulletsField from "../../../../Form/components/BulletsField";
import TagsInput from "../../../../Form/components/TagsInput";

function RoomForm({ handleSubmitForm, initialRoomValues }) {
  const { room } = useRoom();
  const { handleChange, handleSubmit, errors, formDetails, setFormDetails } =
    useForm(initialRoomValues, roomSchema, handleSubmitForm);
  const { isUploading } = useCloudinaryUpload();
  const {
    handleUploadHeroImage,
    handleUploadGalleryImage,
    handleDeleteImageFromGallery,
  } = useRoomUploadImages(setFormDetails, "rooms");

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          maxWidth="sm"
          spacing={1}
          sx={{ bgcolor: "#fff", p: 2 }}
        >
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
            <Grid size={{ md: 4, xs: 12 }}>
              <FormControl
                margin="dense"
                fullWidth
                error={Boolean(errors.roomType)}
              >
                <InputLabel>Room Type</InputLabel>

                <Select
                  name="roomType"
                  value={formDetails.roomType || ""}
                  label="Room Type"
                  onChange={(e) =>
                    setFormDetails((prev) => ({
                      ...prev,
                      roomType: e.target.value,
                    }))
                  }
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Double">Double</MenuItem>
                  <MenuItem value="Suite">Suite</MenuItem>
                  <MenuItem value="Shared">Shared</MenuItem>
                  <MenuItem value="Studio">Studio</MenuItem>
                </Select>

                {errors.roomType && (
                  <Typography variant="body2" color="error">
                    {errors.roomType}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid size={{ md: 4, xs: 12 }}>
              <MyTextField
                label="bedType"
                name="bedType"
                onChange={handleChange}
                error={Boolean(errors.bedType)}
                helperText={errors.bedType}
                value={formDetails.bedType}
              />
            </Grid>

            <Grid size={{ md: 4, xs: 12 }}>
              <FormControl
                margin="dense"
                fullWidth
                error={Boolean(errors.view)}
              >
                <InputLabel>View</InputLabel>

                <Select
                  name="view"
                  value={formDetails.view || ""}
                  label="View"
                  onChange={(e) =>
                    setFormDetails((prev) => ({
                      ...prev,
                      view: e.target.value,
                    }))
                  }
                >
                  <MenuItem value="Sea">Sea</MenuItem>
                  <MenuItem value="Pool">Pool</MenuItem>
                  <MenuItem value="Garden">Garden</MenuItem>
                  <MenuItem value="Mountain">Mountain</MenuItem>
                  <MenuItem value="None">None</MenuItem>
                </Select>

                {errors.view && (
                  <Typography variant="body2" color="error">
                    {errors.view}
                  </Typography>
                )}
              </FormControl>
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
            <Grid size={{ md: 12, xs: 12 }}>
              <MyTextField
                label="description"
                name="description"
                onChange={handleChange}
                error={Boolean(errors.description)}
                helperText={errors.description}
                value={formDetails.description}
                required
              />
            </Grid>
            <Grid size={{ md: 12, xs: 12 }}>
              <BulletsField
                label="bullets"
                value={formDetails.bullets || []}
                onChange={(newBullets) =>
                  setFormDetails((prev) => ({
                    ...prev,
                    bullets: newBullets,
                  }))
                }
                error={Boolean(errors.bullets)}
                helperText={errors.bullets}
              />
            </Grid>
            <Grid size={{ md: 12, xs: 12 }}>
              <TagsInput
                label="tags"
                name="tags"
                value={formDetails.tags || []}
                onChange={(newTags) =>
                  setFormDetails((prev) => ({
                    ...prev,
                    tags: newTags,
                  }))
                }
              />
              {errors.tags && (
                <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
                  {errors.tags}
                </Typography>
              )}
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
                label="price"
                onChange={handleChange}
                name="price"
                error={Boolean(errors.price)}
                helperText={errors.price}
                value={formDetails.price}
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
              <Grid size={{ md: 6, xs: 12 }}>
                <FormControlLabel
                  control={
                    <Switch
                      name="isActive"
                      checked={Boolean(formDetails.isActive)}
                      onChange={handleChange}
                    />
                  }
                  label="Active"
                />
              </Grid>
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
            <Button
              variant="contained"
              component="label"
              disabled={isUploading}
            >
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
            <Button
              variant="contained"
              component="label"
              disabled={isUploading}
            >
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
              {formDetails.gallery &&
                formDetails.gallery.map((img, index) => (
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
              type="submit"
              fullWidth
            >
              {!room ? " Create new room" : "Edit room"}
            </Button>
          </Box>
        </Grid>
      </form>
    </>
  );
}

export default RoomForm;
