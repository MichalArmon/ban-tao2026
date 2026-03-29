import { TextField } from "@mui/material";

function MyTextField({
  label,
  onChange,
  sx,
  error,
  helperText,
  value,
  type,
  size = "medium",
  ...props
}) {
  return (
    <TextField
      {...props}
      onChange={onChange}
      label={label}
      variant="outlined"
      fullWidth
      size={size}
      margin="dense"
      sx={sx}
      error={error}
      helperText={helperText}
      type={type}
      value={value}
    />
  );
}

export default MyTextField;
