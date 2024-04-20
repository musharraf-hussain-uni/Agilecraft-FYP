import "./Dropdown.css";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Dropdown = ({ value, onChange }) => {
  return (
    <Box className="custom-dropdown" sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-role-label">Select Role</InputLabel>
        <Select
          labelId="select-role-label"
          id="select-role"
          value={value}
          label="Select Role"
          onChange={onChange}
          sx={{ width: "40%" }}
        >
          <MenuItem value="" disabled>
            Select Role
          </MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="employee">Employee</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
