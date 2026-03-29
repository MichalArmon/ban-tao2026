import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function BirthDatePicker({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label="Date of Birth" value={value} onChange={onChange} />
    </LocalizationProvider>
  );
}

export default BirthDatePicker;
