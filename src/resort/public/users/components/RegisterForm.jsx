import MyTextField from "../../../../Form/MyTextField";
import useForm from "../../../hooks/useForm";
import axios from "axios";
import { Grid, Button, Box } from "@mui/material";
import { Loop } from "@mui/icons-material";
import initialRegisterValues from "../helpers/initialValues/initialRegisterValues";

import registerSchema from "../models/registerSchema";
import normalizeRegisterDetails from "../helpers/normalization/normalizeRegisterDetails";

const handleSubmitRegister = async () => {
  const { userDetailsForServer } = normalizeRegisterDetails();

  try {
    const response = await axios.post(
      "https://cardsserver-8uqn.onrender.com/users",
      userDetailsForServer,
    );
    console.log(response);
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      alert(error.response.data);
    }
  }
};

function RegisterForm() {
  const { handleChange, handleSubmit, errors, formDetails } = useForm(
    initialRegisterValues,
    registerSchema,

    handleSubmitRegister,
  );
  return (
    <>
      {" "}
      <Grid container maxWidth="md" spacing={1} sx={{ bgcolor: "#fff", p: 2 }}>
        <Grid container size={12} sx={{ display: "flex" }}>
          <Grid size={{ md: 4, xs: 12 }}>
            <MyTextField
              label="First Name"
              name="first"
              onChange={handleChange}
              error={Boolean(errors.first)}
              helperText={errors.first}
              value={formDetails.first || ""}
              required
            />
          </Grid>
          <Grid size={{ md: 4, xs: 12 }}>
            <MyTextField
              label="Middle Name"
              name="middle"
              onChange={handleChange}
              error={Boolean(errors.middle)}
              helperText={errors.middle}
              value={formDetails.middle}
            />
          </Grid>
          <Grid size={{ md: 4, xs: 12 }}>
            <MyTextField
              label="Last Name"
              name="last"
              onChange={handleChange}
              error={Boolean(errors.last)}
              helperText={errors.last}
              value={formDetails.last}
              required
            />
          </Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="Phone"
              name="phone"
              onChange={handleChange}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              value={formDetails.phone}
              type="tel"
              required
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="Email"
              name="email"
              onChange={handleChange}
              type="email"
              error={Boolean(errors.email)}
              value={formDetails.email}
              helperText={errors.email}
              required
            />
          </Grid>
        </Grid>
        <Grid size={12}>
          <MyTextField
            label="Password"
            name="password"
            onChange={handleChange}
            value={formDetails.password}
            type="password"
            required
            error={Boolean(errors.password)}
            helperText={errors.password}

            // sx={{ "& .MuiOutlinedInput-root": { borderRadius: 5 } }}
          />
        </Grid>
        <Grid container size={12} onChange={handleChange}>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="url"
              onChange={handleChange}
              name="url"
              error={Boolean(errors.url)}
              helperText={errors.url}
              value={formDetails.url}
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="alt"
              onChange={handleChange}
              name="alt"
              error={Boolean(errors.alt)}
              helperText={errors.alt}
              value={formDetails.alt}
            />
          </Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={{ md: 3, xs: 12 }}>
            <MyTextField
              label="state"
              name="state"
              onChange={handleChange}
              error={Boolean(errors.state)}
              helperText={errors.state}
              value={formDetails.state}
            />
          </Grid>
          <Grid size={{ md: 4, xs: 12 }}>
            <MyTextField
              label="country"
              onChange={handleChange}
              name="country"
              error={Boolean(errors.country)}
              helperText={errors.country}
              value={formDetails.country}
            />
          </Grid>
          <Grid size={{ md: 5, xs: 12 }}>
            <MyTextField
              label="city"
              name="city"
              onChange={handleChange}
              error={Boolean(errors.city)}
              helperText={errors.city}
              value={formDetails.city}
            />
          </Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={{ md: 4, xs: 12 }}>
            <MyTextField
              label="street"
              onChange={handleChange}
              name="street"
              error={Boolean(errors.street)}
              helperText={errors.street}
              value={formDetails.street}
            />
          </Grid>
          <Grid size={{ md: 2, xs: 12 }}>
            <MyTextField
              label="num"
              onChange={handleChange}
              name="houseNumber"
              error={Boolean(errors.houseNumber)}
              helperText={errors.houseNumber}
              value={formDetails.houseNumber}
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="ZIP"
              onChange={handleChange}
              name="zip"
              error={Boolean(errors.zip)}
              helperText={errors.zip}
              value={formDetails.zip}
            />
          </Grid>
        </Grid>
        {/* <Grid container size={12}>
        
            <FormControlLabel
              name="isBusiness"
              control={<CheckBox />}
              label="Signup as business"
            />{" "}
      
        </Grid> */}
        <Grid container size={12}>
          <Grid size={{ md: 6, xs: 12 }}>
            <Button variant="outlined" fullWidth size="lg" color="error">
              Cancel
            </Button>
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <Button
              variant="outlined"
              fullWidth
              // sx={{ color: "text.primary" }}
            >
              <Loop />
            </Button>
          </Grid>
        </Grid>
        <Box>
          <Button
            sx={{
              borderRadius: 9,
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
            REGISTER
          </Button>
        </Box>
      </Grid>
    </>
  );
}

export default RegisterForm;
