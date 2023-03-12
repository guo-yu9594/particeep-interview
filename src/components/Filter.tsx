import { IconButton, ThemeProvider, createTheme } from "@mui/material";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import Movie from "../interfaces/Movie";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const filterMenuStyle: React.CSSProperties = {
  boxShadow: "1px 3px 8px #e2e2e2",
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

interface categoriesCheck {
  name: string;
  checked: boolean;
}

const getCategories = (movies: Movie[]): categoriesCheck[] => {
  let categories: categoriesCheck[] = [];

  movies.forEach((movie) => {
    if (categories.find((category) => category.name === movie.category) === undefined)
      if (movie.filtered !== undefined && movie.filtered === true)
        categories.push({ name: movie.category, checked: false });
      else categories.push({ name: movie.category, checked: true });
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
  const [categories, setCategories] = useState<categoriesCheck[]>([]);

  const handleCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const categoriesCopy = categories.map((category) => {
      if (category.name === event.target.name) category.checked = checked;
      return category;
    });
    const moviesCopy = movies.map((movie) => {
      if (movie.category === event.target.name)
        movie.filtered = !checked;
      return movie;
    });
    setCategories(categoriesCopy);
    setMovies(moviesCopy);
  };

  useEffect(() => {
    setCategories(getCategories(movies));
  }, [movies]);

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
            <MenuItem key={category.name} sx={menuItemStyle}>
              <FormControlLabel
                control={
                  <ThemeProvider theme={theme}>
                    <Checkbox
                      sx={filterCheckboxStyle}
                      checked={category.checked}
                      onChange={handleCheckbox}
                      key={category.name}
                      name={category.name}
                    />
                  </ThemeProvider>
                }
                label={category.name}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default Filter;
