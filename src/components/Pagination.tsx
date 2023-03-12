import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Movie from '../interfaces/Movie'

const ListPaginationStyle: React.CSSProperties = {
  marginTop: "2vh",
  marginBottom: "2vh",
};

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
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontFamily: "Inter, sans-serif",
          fontWeight: "600",
        },
      },
    },
  },
});

interface ListPaginationProps {
  movies: Movie[];
  nbPerPage: number;
  selectedPage: number;
  setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
}

const ListPagination = ({movies, nbPerPage, selectedPage, setSelectedPage}: ListPaginationProps): JSX.Element => {
  const nbPages = Math.ceil(movies.length / nbPerPage);
  const handleChange = (_: React.ChangeEvent<unknown>, page: number) => {
    if (selectedPage !== page)
      setSelectedPage(page)
  }

  return (
    <ThemeProvider theme={theme}>
      <Pagination color="primary" style={ListPaginationStyle} count={nbPages} onChange={handleChange} />
    </ThemeProvider>
  );
};

export default ListPagination;
