import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  FormControl,
  InputLabel,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3c00ff",
    },
    secondary: {
      main: "#9386ba",
    },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "Inter, sans-serif",
          fontWeight: "500",
        },
      },
    },
  },
});

export interface QuantitySelectorProps {
  nbPerPage: number;
  setNbPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const QuantitySelector = ({nbPerPage, setNbPerPage}: QuantitySelectorProps): JSX.Element => {
  const possibilities = [4, 8, 12];
  const handleChange = (event: SelectChangeEvent) => setNbPerPage(+event.target.value);

  return (
    <ThemeProvider theme={theme}>
      <FormControl variant="outlined" sx={{ width: "100px", my: "1vh" }}>
        <InputLabel id="demo-simple-select-label" sx={{fontFamily: 'Inter', fontWeight: '500'}} >Quantity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={nbPerPage.toString()}
          label="Quantity"
          onChange={handleChange}
          sx={{ height: "5vh", borderRadius: "1000px", fontFamily: 'Inter', fontWeight: '500' }}
        >
          {possibilities.map((possibility) => (
            <MenuItem
              key={possibility}
              value={possibility}
              sx={{ fontFamily: "Inter" }}
            >
              {possibility}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};

export default QuantitySelector;
