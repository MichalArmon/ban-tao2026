import React from "react";
import { Box, TextField, IconButton, Button, Typography } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

function BulletsField({
  label = "Bullets",
  value = [],
  onChange,
  error,
  helperText,
}) {
  const handleAddBullet = () => {
    onChange([...(value || []), ""]);
  };

  const handleRemoveBullet = (indexToRemove) => {
    const updatedBullets = (value || []).filter(
      (_, index) => index !== indexToRemove,
    );
    onChange(updatedBullets);
  };

  const handleChangeBullet = (indexToUpdate, newValue) => {
    const updatedBullets = [...(value || [])];
    updatedBullets[indexToUpdate] = newValue;
    onChange(updatedBullets);
  };

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {label}
      </Typography>

      {(value || []).map((bullet, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            gap: 1,
            mb: 1,
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            size="small"
            label={`Bullet ${index + 1}`}
            value={bullet}
            onChange={(e) => handleChangeBullet(index, e.target.value)}
          />

          <IconButton color="error" onClick={() => handleRemoveBullet(index)}>
            <Delete />
          </IconButton>
        </Box>
      ))}

      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={handleAddBullet}
        sx={{ mt: 1 }}
      >
        Add bullet
      </Button>

      {(error || helperText) && (
        <Typography
          variant="body2"
          color={error ? "error" : "text.secondary"}
          sx={{ mt: 1 }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
}

export default BulletsField;
