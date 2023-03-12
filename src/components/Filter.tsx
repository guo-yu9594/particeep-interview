import { IconButton, ThemeProvider, createTheme } from "@mui/material";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Movie from "../interfaces/Movie";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const filterMenuStyle: React.CSSProperties = {
  boxShadow: "none",
  borderRadius: "25px",
};

const menuItemStyle: React.CSSProperties = {
  color: "#3c00ff",
  fontFamily: "Inter",
  fontWeight: "500",
  padding: "20px",
};

const filterCheckboxStyle: React.CSSProperties = {
  transform: "scale(0.9)",
  color: "#3c00ff",
};

const getCategories = (movies: Movie[]): string[] => {
  let categories: string[] = [];

  movies.forEach((movie) => {
    if (categories.find((category) => category == movie.category) == undefined)
      categories.push(movie.category);
  });
  return categories;
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#3c00ff",
    },
  },
});

export interface FilterProps {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const Filter = ({ movies, setMovies }: FilterProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const categories: string[] = getCategories(movies);
  const handleCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    console.log(checked, event.target.name);
    setMovies(movies.map(movie => {
      if (movie.category === event.target.name)
        movie.filtered = !movie.filtered;
      return movie;
    }));
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          color: "white",
          marginLeft: "auto",
          marginRight: "2%",
          padding: "1%",
        }}
      >
        <SortRoundedIcon
          sx={{ color: "white", width: "35px", height: "auto" }}
        />
      </IconButton>
      <Menu
        sx={filterMenuStyle}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{ style: filterMenuStyle }}
      >
        {categories.map((category) => {
          return (
            <MenuItem sx={menuItemStyle}>
              <FormControlLabel
                control={
                  <ThemeProvider theme={theme}>
                    <Checkbox
                      sx={filterCheckboxStyle}
                      defaultChecked
                      onChange={handleCheckbox}
                      key={category}
                      name={category}
                    />
                  </ThemeProvider>
                }
                label={category}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default Filter;
