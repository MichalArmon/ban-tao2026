import { TextField } from "@mui/material";

function MyTextField({
  label,
  onChange,
  sx,
  error,
  helperText,
  value,
  type,
  ...props
}) {
  return (
    <TextField
      {...props}
      onChange={onChange}
      label={label}
      variant="outlined"
      fullWidth
      size="medium"
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
