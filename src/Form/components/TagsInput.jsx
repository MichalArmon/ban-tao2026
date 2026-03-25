import { Autocomplete, TextField } from "@mui/material";

function TagsInput({ label, value, onChange, name }) {
  return (
    <Autocomplete
      name={name}
      multiple
      freeSolo
      options={[]}
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          placeholder="Type And press Enter"
        />
      )}
    />
  );
}

export default TagsInput;
