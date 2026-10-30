import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { motion, AnimatePresence } from "motion/react";

const CONTACT_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

const imageUrl =
  "https://images.pexels.com/photos/20657436/pexels-photo-20657436.jpeg?auto=compress&cs=tinysrgb&w=1400";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

const fieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
    backgroundColor: "transparent",
    color: "#283C34",
    "& fieldset": {
      borderColor: "rgba(40,60,52,0.22)",
    },
    "&:hover fieldset": {
      borderColor: "#526F5C",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#526F5C",
      borderWidth: 1,
    },
  },
  "& .MuiInputLabel-root": {
    color: "#707970",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#526F5C",
  },
};

export default function ContactSection() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === "sending") return;

    setError("");

    if (!CONTACT_ENDPOINT) {
      setError("Contact form is not configured yet.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          _subject: "New inquiry | Ban Tao Resort",
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      console.error("Contact form error:", err);
      setError("Something went wrong. Please try again in a moment.");
      setStatus("idle");
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setError("");
    setStatus("idle");
  };

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        width: "100vw",
        maxWidth: "100vw",
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
        bgcolor: "#F7F5EF",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "47% 53%",
          },
          minHeight: { md: "780px" },
        }}
      >
        {/* LEFT: IMAGE */}
        <Box
          sx={{
            minHeight: { xs: 360, sm: 480, md: "100%" },
            position: "relative",
            overflow: "hidden",
            bgcolor: "#50675C",
          }}
        >
          <Box
            component={motion.div}
            initial={{ scale: 1.12 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `linear-gradient(
                180deg,
                rgba(18, 33, 27, 0.05) 20%,
                rgba(18, 33, 27, 0.5) 100%
              ), url("${imageUrl}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <Stack
            sx={{
              position: "absolute",
              bottom: { xs: 36, md: 64 },
              left: { xs: 30, md: 64 },
              right: 30,
              color: "#fff",
              zIndex: 1,
            }}
            spacing={2}
          >
            <Typography
              sx={{
                fontSize: 12,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              BAN TAO · KOH PHANGAN
            </Typography>

            <Typography
              sx={{
                fontFamily: "Georgia, serif",
                fontSize: {
                  xs: 34,
                  md: 48,
                },
                lineHeight: 1.13,
                fontWeight: 400,
                maxWidth: 400,
              }}
            >
              Your journey begins with a conversation.
            </Typography>

            <Box
              sx={{
                width: 55,
                height: 1,
                bgcolor: "rgba(255,255,255,0.8)",
              }}
            />
          </Stack>
        </Box>

        {/* RIGHT: CONTACT FORM */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 3, sm: 7, md: 8, lg: 11 },
            py: { xs: 8, md: 12 },
          }}
        >
          <Container maxWidth={false} disableGutters>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <Box
                  key="success"
                  component={motion.div}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  sx={{
                    textAlign: "center",
                    py: 8,
                    maxWidth: 500,
                    mx: "auto",
                  }}
                >
                  <Box
                    component={motion.div}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 14,
                    }}
                    sx={{
                      width: 86,
                      height: 86,
                      borderRadius: "50%",
                      bgcolor: "#E5EBE3",
                      color: "#42634F",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 4,
                    }}
                  >
                    <CheckRoundedIcon sx={{ fontSize: 40 }} />
                  </Box>

                  <Typography
                    sx={{
                      fontSize: 11,
                      letterSpacing: "0.3em",
                      color: "#78917C",
                      mb: 2,
                    }}
                  >
                    MESSAGE SENT
                  </Typography>

                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "Georgia, serif",
                      color: "#243D31",
                      fontSize: { xs: 38, md: 50 },
                      mb: 3,
                    }}
                  >
                    Thank you for reaching out.
                  </Typography>

                  <Typography
                    sx={{
                      color: "#788078",
                      lineHeight: 1.9,
                      mb: 5,
                    }}
                  >
                    Your message has been successfully submitted. We look
                    forward to connecting with you.
                  </Typography>

                  <Button
                    variant="outlined"
                    onClick={resetForm}
                    sx={{
                      borderRadius: 0,
                      px: 4,
                      py: 1.7,
                      color: "#304D3C",
                      borderColor: "#304D3C",
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "#304D3C",
                        color: "#fff",
                      },
                    }}
                  >
                    Send another message
                  </Button>
                </Box>
              ) : (
                <Box
                  key="form"
                  component={motion.div}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  sx={{
                    maxWidth: 540,
                    mx: "auto",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#809583",
                      letterSpacing: "0.28em",
                      fontSize: 11,
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    WE'D LOVE TO HEAR FROM YOU
                  </Typography>

                  <Typography
                    component="h2"
                    sx={{
                      fontFamily: "Georgia, serif",
                      fontSize: {
                        xs: 45,
                        sm: 54,
                        lg: 65,
                      },
                      lineHeight: 1.08,
                      fontWeight: 400,
                      color: "#273C31",
                      mb: 3,
                    }}
                  >
                    Let's get
                    <Box
                      component="span"
                      sx={{
                        fontStyle: "italic",
                        display: "block",
                        color: "#79917C",
                      }}
                    >
                      in touch.
                    </Box>
                  </Typography>

                  <Typography
                    sx={{
                      color: "#7B8279",
                      fontSize: 15,
                      lineHeight: 1.9,
                      mb: 5,
                      maxWidth: 430,
                    }}
                  >
                    Have a question, a special request, or simply dreaming of
                    your next island escape? Leave us a message and we'll be
                    happy to help.
                  </Typography>

                  <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        required
                        name="name"
                        label="Your Name"
                        value={form.name}
                        onChange={updateField}
                        disabled={status === "sending"}
                        inputProps={{ maxLength: 100 }}
                        sx={fieldStyles}
                      />

                      <TextField
                        fullWidth
                        required
                        name="email"
                        label="Email Address"
                        type="email"
                        value={form.email}
                        onChange={updateField}
                        disabled={status === "sending"}
                        sx={fieldStyles}
                      />

                      <TextField
                        fullWidth
                        required
                        multiline
                        minRows={5}
                        name="message"
                        label="Your Message"
                        value={form.message}
                        onChange={updateField}
                        disabled={status === "sending"}
                        inputProps={{ maxLength: 5000 }}
                        sx={fieldStyles}
                      />

                      {error && (
                        <Typography
                          role="alert"
                          sx={{
                            color: "#B4534A",
                            fontSize: 13,
                          }}
                        >
                          {error}
                        </Typography>
                      )}

                      <Button
                        type="submit"
                        disabled={status === "sending"}
                        endIcon={
                          status === "sending" ? null : <ArrowOutwardIcon />
                        }
                        sx={{
                          bgcolor: "#304C3D",
                          color: "#fff",
                          borderRadius: 0,
                          py: 2.1,
                          px: 4,
                          mt: 1,
                          letterSpacing: "0.15em",
                          fontSize: 12,
                          fontWeight: 600,
                          "&:hover": {
                            bgcolor: "#456851",
                            transform: "translateY(-2px)",
                          },
                          "&:disabled": {
                            bgcolor: "#87978A",
                            color: "#fff",
                          },
                          transition: "all 0.25s ease",
                        }}
                      >
                        {status === "sending" ? (
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <CircularProgress
                              size={17}
                              sx={{ color: "#fff" }}
                            />
                            <span>Sending your message...</span>
                          </Stack>
                        ) : (
                          "SEND MESSAGE"
                        )}
                      </Button>
                    </Stack>
                  </Box>

                  <Typography
                    sx={{
                      color: "#9A9F98",
                      mt: 4,
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    A little message can be the beginning of something
                    wonderful.
                  </Typography>
                </Box>
              )}
            </AnimatePresence>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
