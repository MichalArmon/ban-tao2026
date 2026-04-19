import { TextField } from "@mui/material";

function MyTextField({
  margin = "dense",
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
      margin={margin}
      sx={sx}
      error={error}
      helperText={helperText}
      type={type}
      value={value}
    />
  );
}

export default MyTextField;
